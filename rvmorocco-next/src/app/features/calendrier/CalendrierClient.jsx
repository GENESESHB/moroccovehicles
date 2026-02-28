'use client';

import React, { useState } from 'react';
import {
    Calendar, Clock, Car, TrendingUp, Activity, CalendarRange, AlertCircle, Bell, Download,
    CheckCircle, ArrowUpRight, ArrowDownRight, Zap, ChevronRight, Eye, Edit3, Sunrise, Sunset,
    CalendarDays, CalendarCheck, MessageCircleQuestion, ChevronDown
} from 'lucide-react';
import './CalendarPage.css';
import { STATS, WEEK_DAYS, BOOKINGS, UPCOMING_EVENTS, FEATURES } from './constants';
import { faqs } from './faqs';

export default function CalendrierClient() {
    const [selectedView, setSelectedView] = useState('week');
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const renderFeatureContent = () => {
        return (
            <div className="featureExplanation">
                <div className="featureHeader">
                    <div className="featureIconLarge" style={{ background: '#dbeafe', color: '#3b82f6' }}>
                        <CalendarDays size={32} />
                    </div>
                    <div>
                        <h3>Un calendrier conçu pour les pros</h3>
                        <p>Visualisez, planifiez et optimisez votre flotte en un coup d'œil</p>
                    </div>
                </div>
                <div className="featureSteps">
                    <div className="step">
                        <div className="stepNumber">1</div>
                        <div className="stepContent">
                            <h5>Vue d'ensemble</h5>
                            <p>Consultez les réservations par jour, semaine ou mois. Filtrez par véhicule, client ou statut.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="stepNumber">2</div>
                        <div className="stepContent">
                            <h5>Glisser-déposer</h5>
                            <p>Déplacez facilement les réservations pour ajuster les plages horaires. Les conflits sont signalés.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="stepNumber">3</div>
                        <div className="stepContent">
                            <h5>Gestion des indisponibilités</h5>
                            <p>Marquez les véhicules en maintenance, les jours fériés ou les périodes de fermeture.</p>
                        </div>
                    </div>
                </div>
                <div className="updateTypes">
                    <div className="updateCard">
                        <h6><CalendarCheck size={16} color="#36c275" /> Synchronisation</h6>
                        <p>Connectez votre calendrier à Google Calendar, Outlook ou Apple Calendar.</p>
                    </div>
                    <div className="updateCard">
                        <h6><Zap size={16} color="#f59e0b" /> Suggestions</h6>
                        <p>Le système propose automatiquement les créneaux disponibles pour une nouvelle réservation.</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="vehiclesPage">
            {/* Hero Section */}
            <section className="heroSection">
                <div className="heroOverlay">
                    <div className="containerContent">
                        <div className="heroContent">
                            <div className="badge">
                                <Calendar size={14} />
                                Calendrier interactif
                            </div>
                            <h1>Visualisez et gérez vos réservations</h1>
                            <p className="heroSubtitle">
                                Visualisez en temps réel les réservations et la disponibilité de vos véhicules.
                                Le calendrier interactif vous permet de planifier les locations, d'éviter les chevauchements
                                et de gérer les périodes de maintenance.
                            </p>
                            <div className="heroCta">
                                <button className="btn btnPrimary">
                                    <CalendarRange size={20} />
                                    Voir le calendrier
                                </button>
                                <button className="btn btnOutline">
                                    <Download size={20} />
                                    Exporter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="statsSection">
                <div className="containerContent">
                    <div className="statsGrid">
                        {STATS.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="statCard" style={{ borderLeftColor: stat.color }}>
                                    <div className="statIcon" style={{ background: `${stat.color}20`, color: stat.color }}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="statInfo">
                                        <span className="statLabel">{stat.label}</span>
                                        <span className="statValue">{stat.value}</span>
                                        <span className="statSubtext">{stat.subtext}</span>
                                        <span className={`statTrend ${stat.trendUp ? 'positive' : 'negative'}`}>
                                            {stat.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                            {stat.trend}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Calendar Preview */}
            <section className="moduleSection bgLight">
                <div className="containerContent">
                    <div className="sectionHeader">
                        <h2><CalendarDays size={28} color="#3b82f6" /> Aperçu de la semaine</h2>
                        <p>Prises en charge, retours et réservations en cours</p>
                    </div>

                    <div className="calendarViewSelector">
                        <button
                            className={`viewBtn ${selectedView === 'day' ? 'active' : ''}`}
                            onClick={() => setSelectedView('day')}
                        >Jour</button>
                        <button
                            className={`viewBtn ${selectedView === 'week' ? 'active' : ''}`}
                            onClick={() => setSelectedView('week')}
                        >Semaine</button>
                        <button
                            className={`viewBtn ${selectedView === 'month' ? 'active' : ''}`}
                            onClick={() => setSelectedView('month')}
                        >Mois</button>
                    </div>

                    <div className="calendarContainer">
                        <div className="calendarHeader">
                            <div className="timeGutter"></div>
                            {WEEK_DAYS.map((day, i) => (
                                <div key={i} className="dayHeader">
                                    {day} {i + 10}/06
                                </div>
                            ))}
                        </div>

                        <div className="calendarGrid">
                            <div className="timeScale">
                                {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(h => (
                                    <div key={h} className="hourMarker">{h}:00</div>
                                ))}
                            </div>

                            {WEEK_DAYS.map((day, dayIdx) => (
                                <div key={dayIdx} className="dayColumn">
                                    {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(hour => (
                                        <div key={hour} className="hourCell"></div>
                                    ))}
                                    {BOOKINGS.filter(b => b.day === dayIdx).map(booking => (
                                        <div
                                            key={booking.id}
                                            className="bookingBlock"
                                            style={{
                                                top: `${(booking.start - 8) * 40}px`,
                                                height: `${(booking.end - booking.start) * 40}px`,
                                                background: booking.color,
                                            }}
                                        >
                                            <span className="bookingTitle">{booking.vehicle}</span>
                                            <span className="bookingTime">{booking.start}h-{booking.end}h</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="calendarLegend">
                            <span><span className="legendDot" style={{ background: '#3b82f6' }}></span> Réservé</span>
                            <span><span className="legendDot" style={{ background: '#f59e0b' }}></span> Prise en charge</span>
                            <span><span className="legendDot" style={{ background: '#36c275' }}></span> Retour</span>
                            <span><span className="legendDot" style={{ background: '#ef4444' }}></span> Maintenance</span>
                        </div>
                    </div>

                    <div className="flowStats">
                        <div className="flowStat">
                            <Sunrise size={20} color="#f59e0b" />
                            <span>Prises en charge aujourd'hui: <strong>6</strong></span>
                        </div>
                        <div className="flowStat">
                            <Sunset size={20} color="#3b82f6" />
                            <span>Retours aujourd'hui: <strong>8</strong></span>
                        </div>
                        <div className="flowStat">
                            <Car size={20} color="#36c275" />
                            <span>Véhicules disponibles maintenant: <strong>12</strong></span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Explorer */}
            <section className="moduleSection bgWhite">
                <div className="containerContent">
                    <div className="sectionHeader">
                        <h2><Zap size={28} color="#3b82f6" /> Fonctionnalités du calendrier</h2>
                        <p>Optimisez votre planning avec des outils puissants</p>
                    </div>

                    <div className="featureExplorer" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="featureContent" style={{ maxHeight: 'none' }}>
                            {renderFeatureContent()}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '48px' }}>
                        {FEATURES.slice(0, 3).map((feat, i) => {
                            const Icon = feat.icon;
                            return (
                                <div key={i} className="updateCard" style={{ textAlign: 'center' }}>
                                    <Icon size={32} color="#3b82f6" />
                                    <h6 style={{ marginTop: '16px' }}>{feat.title}</h6>
                                    <p style={{ fontSize: '14px' }}>{feat.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Upcoming Events List */}
            <section className="moduleSection bgLight">
                <div className="containerContent">
                    <div className="listHeader">
                        <div className="listTitle">
                            <h2><Clock size={24} /> Échéances du jour</h2>
                            <span className="countBadge">6 événements</span>
                        </div>
                        <div className="listControls">
                            <div className="filterGroup">
                                <select className="filterSelect">
                                    <option>Tous</option>
                                    <option>Prises en charge</option>
                                    <option>Retours</option>
                                    <option>Maintenance</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="eventsList">
                        {UPCOMING_EVENTS.map((event, idx) => (
                            <div key={idx} className="eventCard">
                                <div className="eventTime">
                                    <span className="eventTimeValue">{event.time}</span>
                                    <span className="eventTimeLabel">
                                        {event.type === 'pickup' ? 'Prise' : event.type === 'return' ? 'Retour' : 'Maintenance'}
                                    </span>
                                </div>
                                <div className="eventDetails">
                                    <div className="eventVehicle">{event.vehicle}</div>
                                    <div className="eventClient">{event.client}</div>
                                </div>
                                <div className="eventStatus">
                                    <span className={`statusBadge ${event.status}`}>
                                        {event.status}
                                    </span>
                                </div>
                                <div className="eventActions">
                                    <button className="actionBtn"><Eye size={16} /></button>
                                    <button className="actionBtn"><Edit3 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        <button className="pageBtn" disabled>
                            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                            Précédent
                        </button>
                        <div className="pageNumbers">
                            <button className="pageNumber active">1</button>
                            <button className="pageNumber">2</button>
                            <button className="pageNumber">3</button>
                        </div>
                        <button className="pageBtn">
                            Suivant
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="moduleSection bgWhite">
                <div className="containerContent">
                    <div className="sectionHeader" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
                        <h2><MessageCircleQuestion size={28} color="#3b82f6" /> Questions Fréquentes (Planning)</h2>
                        <p>Tout savoir sur la gestion du temps pour votre agence</p>
                    </div>

                    <div className="faqContainer" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faqItem ${openFaq === index ? 'active' : ''}`}
                                style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <button
                                    className="faqQuestion"
                                    onClick={() => toggleFaq(index)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '24px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: '#1e293b',
                                        textAlign: 'left'
                                    }}
                                >
                                    <span style={{ paddingRight: '24px' }}>{faq.question}</span>
                                    <ChevronDown
                                        size={20}
                                        style={{
                                            color: '#3b82f6',
                                            transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0)',
                                            transition: 'transform 0.3s ease',
                                            flexShrink: 0
                                        }}
                                    />
                                </button>
                                <div
                                    className="faqAnswer"
                                    style={{
                                        height: openFaq === index ? 'auto' : '0',
                                        opacity: openFaq === index ? 1 : 0,
                                        padding: openFaq === index ? '0 24px 24px' : '0 24px',
                                        color: '#64748b',
                                        lineHeight: '1.6',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <p style={{ margin: 0 }}>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="ctaSection">
                <div className="containerContent">
                    <div className="ctaBox" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
                        <h2>Prêt à optimiser votre planning ?</h2>
                        <p>Gagnez en efficacité et évitez les erreurs de réservation avec notre calendrier intelligent.</p>
                        <div className="ctaStats">
                            <span><CheckCircle size={14} /> Synchronisation automatique</span>
                            <span><CheckCircle size={14} /> Alertes en temps réel</span>
                            <span><CheckCircle size={14} /> Vue multi-agences</span>
                            <span><CheckCircle size={14} /> Export iCal</span>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className="btn btnWhite">
                                <Calendar size={20} />
                                Accéder au calendrier
                            </button>
                            <button className="btn btnOutline" style={{ borderColor: 'white', color: 'white' }}>
                                <Download size={20} />
                                Télécharger l'app
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
