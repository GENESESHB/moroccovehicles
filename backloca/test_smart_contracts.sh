#!/bin/bash

# Comprehensive test script for statistics API
echo "📊 COMPREHENSIVE STATISTICS API TEST"
echo "======================================"

# Configuration
BASE_URL="http://localhost:3001"
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDdiMzc0NDQ4MjU3NWY2OTk4MmE2YyIsImlhdCI6MTc2NzQ2NzE4MCwiZXhwIjoxNzY3NDcwNzgwfQ.2PQCfnRCvTh6TDegcDjzwQUbjvSNNCXesGpkO3OUapA"

# Check if token is provided
if [ "$TOKEN" = "YOUR_JWT_TOKEN_HERE" ]; then
    echo "❌ ERROR: Please set your JWT token in the script"
    echo "Get token from: curl -X POST $BASE_URL/api/auth/login -H 'Content-Type: application/json' -d '{\"email\":\"your-email\",\"password\":\"your-password\"}'"
    exit 1
fi

# Test function
test_endpoint() {
    local endpoint=$1
    local description=$2
    
    echo -e "\n🔍 Testing: $description"
    echo "Endpoint: $endpoint"
    
    response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X GET "$BASE_URL$endpoint" \
        -H "Authorization: Bearer $TOKEN" \
        -H "Content-Type: application/json")
    
    http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d':' -f2)
    body=$(echo "$response" | sed 's/HTTP_STATUS:[0-9]*//')
    
    echo "HTTP Status: $http_status"
    
    if [ "$http_status" -eq 200 ]; then
        if echo "$body" | grep -q '"success":true'; then
            echo "✅ Success"
            
            # Extract and display relevant info
            case $endpoint in
                */dashboard*)
                    echo "   Dashboard Overview:"
                    echo "$body" | grep -Eo '"totalRevenue":[0-9.]+|"totalRentalDays":[0-9]+|"activeContracts":[0-9]+' | sed 's/"/   /g'
                    echo "   Smart Breakdown:"
                    echo "$body" | grep -A3 '"smart":' | grep -Eo '"[^"]+":[0-9.]+' | sed 's/"/   /g'
                    ;;
                */monthly*)
                    echo "   Monthly Stats:"
                    echo "$body" | grep -Eo '"monthName":"[^"]+"|"totalVehiclesRented":[0-9]+|"totalRentalDays":[0-9]+|"totalRevenue":[0-9.]+' | sed 's/"/   /g'
                    
                    # Check if smart vehicles are present
                    smart_count=$(echo "$body" | grep -o '"vehicleType":"smart"' | wc -l)
                    regular_count=$(echo "$body" | grep -o '"vehicleType":"regular"' | wc -l)
                    echo "   Vehicle Types: Regular=$regular_count, Smart=$smart_count"
                    
                    # Show breakdown
                    if echo "$body" | grep -q '"breakdown"'; then
                        echo "   Breakdown:"
                        echo "$body" | grep -A5 '"breakdown"' | grep -Eo '"[^"]+":[0-9.]+' | head -6 | sed 's/"/   /g'
                    fi
                    ;;
                */yearly*)
                    echo "   Yearly Stats:"
                    echo "$body" | grep -Eo '"totalYearRentalDays":[0-9]+|"totalYearRevenue":[0-9.]+|"totalUniqueVehicles":[0-9]+' | sed 's/"/   /g'
                    
                    # Check smart vs regular
                    if echo "$body" | grep -q '"summary"'; then
                        echo "   Summary:"
                        echo "$body" | grep -A5 '"summary"' | grep -Eo '"[^"]+":[0-9]+' | sed 's/"/   /g'
                    fi
                    ;;
                */max-rental-vehicle*)
                    echo "   Max Rental Vehicle:"
                    if echo "$body" | grep -q '"name"'; then
                        name=$(echo "$body" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
                        days=$(echo "$body" | grep -o '"rentalDays":[0-9]*' | cut -d':' -f2)
                        type=$(echo "$body" | grep -o '"vehicleType":"[^"]*"' | cut -d'"' -f4)
                        echo "   Vehicle: $name ($type), Days: $days"
                    else
                        echo "   No max rental vehicle found"
                    fi
                    ;;
                */vehicle*)
                    echo "   Vehicle Details:"
                    name=$(echo "$body" | grep -o '"name":"[^"]*"' | head -1 | cut -d'"' -f4)
                    type=$(echo "$body" | grep -o '"vehicleType":"[^"]*"' | cut -d'"' -f4)
                    echo "   Vehicle: $name ($type)"
                    echo "$body" | grep -Eo '"totalRentalDays":[0-9]+|"totalRevenue":[0-9.]+|"contractCount":[0-9]+' | sed 's/"/   /g'
                    ;;
            esac
        else
            echo "❌ API returned success: false"
            message=$(echo "$body" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)
            echo "   Error: $message"
        fi
    else
        echo "❌ HTTP Error: $http_status"
    fi
}

# Current date for testing
CURRENT_YEAR=$(date +%Y)
CURRENT_MONTH=$(date +%m)
PREV_MONTH=$((10#$CURRENT_MONTH - 1))
if [ $PREV_MONTH -eq 0 ]; then
    PREV_MONTH=12
    PREV_YEAR=$((CURRENT_YEAR - 1))
else
    PREV_YEAR=$CURRENT_YEAR
fi

echo "📅 Test Date Parameters:"
echo "   Current: $CURRENT_YEAR-$CURRENT_MONTH"
echo "   Previous: $PREV_YEAR-$PREV_MONTH"

# Run tests
echo -e "\n🚀 STARTING TESTS..."
echo "======================================"

# 1. Dashboard
test_endpoint "/api/stats/dashboard" "Dashboard Overview"

# 2. Monthly stats (current month, all vehicles)
test_endpoint "/api/stats/monthly" "Monthly Stats (Current Month, All Vehicles)"

# 3. Monthly stats with specific month
test_endpoint "/api/stats/monthly?year=$CURRENT_YEAR&month=$CURRENT_MONTH" "Monthly Stats (Specific Month)"

# 4. Monthly stats - regular only
test_endpoint "/api/stats/monthly?year=$CURRENT_YEAR&month=$CURRENT_MONTH&type=regular" "Monthly Stats (Regular Only)"

# 5. Monthly stats - smart only (THIS IS THE KEY TEST)
test_endpoint "/api/stats/monthly?year=$CURRENT_YEAR&month=$CURRENT_MONTH&type=smart" "Monthly Stats (Smart Only)"

# 6. Monthly stats - previous month
test_endpoint "/api/stats/monthly?year=$PREV_YEAR&month=$PREV_MONTH" "Monthly Stats (Previous Month)"

# 7. Yearly stats
test_endpoint "/api/stats/yearly?year=$CURRENT_YEAR" "Yearly Stats (All Vehicles)"

# 8. Yearly stats - smart only
test_endpoint "/api/stats/yearly?year=$CURRENT_YEAR&type=smart" "Yearly Stats (Smart Only)"

# 9. Max rental vehicle
test_endpoint "/api/stats/max-rental-vehicle?year=$CURRENT_YEAR&month=$CURRENT_MONTH" "Max Rental Vehicle"

# 10. Test with a specific smart car ID (you need to get this from your database)
# SMART_CAR_ID="65f1c8f5a1b2c3d4e5f67890"
# test_endpoint "/api/stats/vehicle?vehicleId=$SMART_CAR_ID&year=$CURRENT_YEAR&month=$CURRENT_MONTH&vehicleType=smart" "Specific Smart Car Stats"

echo -e "\n======================================"
echo "🧪 DIAGNOSTIC TESTS"
echo "======================================"

# Diagnostic: Check what the API returns for smart cars
echo -e "\n🔬 Detailed Smart Car Analysis:"
echo "Making detailed request to analyze response..."
DIAG_RESPONSE=$(curl -s -X GET "$BASE_URL/api/stats/monthly?year=$CURRENT_YEAR&month=$CURRENT_MONTH&type=smart" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json")

if echo "$DIAG_RESPONSE" | grep -q '"success":true'; then
    echo "✅ Smart car endpoint is working"
    
    # Count vehicles
    VEHICLE_COUNT=$(echo "$DIAG_RESPONSE" | grep -o '"vehicleId"' | wc -l)
    echo "   Total vehicles returned: $VEHICLE_COUNT"
    
    # Check breakdown
    if echo "$DIAG_RESPONSE" | grep -q '"breakdown"'; then
        echo "   Breakdown found in response"
        SMART_BREAKDOWN=$(echo "$DIAG_RESPONSE" | grep -A10 '"smart":' | grep -Eo '"[^"]+":[0-9.]+')
        if [ -n "$SMART_BREAKDOWN" ]; then
            echo "   Smart Breakdown Values:"
            echo "$SMART_BREAKDOWN" | sed 's/"/   /g'
        fi
    fi
    
    # Check if any smart vehicles have rental days > 0
    SMART_WITH_DAYS=$(echo "$DIAG_RESPONSE" | grep -o '"rentalDays":[1-9][0-9]*' | wc -l)
    echo "   Smart vehicles with rental days > 0: $SMART_WITH_DAYS"
    
    # Show first smart vehicle details if any
    if [ $VEHICLE_COUNT -gt 0 ]; then
        echo "   First smart vehicle details:"
        echo "$DIAG_RESPONSE" | grep -A5 '"vehicles":\[' | grep -Eo '"[^"]+":"[^"]*"|[0-9]+' | head -10 | sed 's/"/   /g'
    fi
else
    echo "❌ Smart car endpoint failed"
    ERROR_MSG=$(echo "$DIAG_RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)
    echo "   Error: $ERROR_MSG"
fi

echo -e "\n======================================"
echo "📋 TEST SUMMARY"
echo "======================================"
echo "To debug smart contract issues:"
echo ""
echo "1. Check if partner has smart cars in database:"
echo "   db.smartcars.find({userId: ObjectId('PARTNER_ID')})"
echo ""
echo "2. Check if smart contracts exist for those cars:"
echo "   db.smartcontracts.find({smartCarId: { \$in: [ObjectId('CAR1'), ObjectId('CAR2')] }})"
echo ""
echo "3. Check contract dates and status:"
echo "   db.smartcontracts.find({"
echo "     smartCarId: { \$in: [...] },"
echo "     status: { \$in: ['active', 'completed'] },"
echo "     startDate: { \$lt: ISODate('2024-02-01') },"
echo "     endDate: { \$gt: ISODate('2024-01-01') }"
echo "   })"
echo ""
echo "4. Common issues:"
echo "   - Dates stored as strings instead of Date objects"
echo "   - Status not 'active' or 'completed'"
echo "   - No contracts in date range"
echo "   - Partner ID mismatch in SmartCar collection"
echo "======================================"
echo "🎉 Testing completed!"