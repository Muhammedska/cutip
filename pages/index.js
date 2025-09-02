import ders from 'data/ders2.json';

export default function Home() {
    const today = new Date();
    const day = String(today.getDate());
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    // 'TARİH' anahtarını doğru bir şekilde kullan
    const schedule = ders.filter(lesson => lesson['TARIH'] === formattedDate);

    // Şu anki dersi bul
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const currentLesson = schedule.find(lesson => {
        const [lessonHour, lessonMinute] = lesson['SAAT'].split(':').map(Number);
        const lessonStartInMinutes = lessonHour * 60 + lessonMinute;
        const lessonEndInMinutes = lessonStartInMinutes + 60; // Assuming 60-minute lessons

        const nowInMinutes = currentHour * 60 + currentMinute;
        return nowInMinutes >= lessonStartInMinutes && nowInMinutes < lessonEndInMinutes;
    });

    return (
        <div className="container">
            <main>
                <div className="card">
                    <header className="header">
                        <h1 className="main-title">Günün Ders Programı</h1>
                        <p className="subtitle">
                            {formattedDate}
                        </p>
                    </header>

                    {currentLesson && (
                        <div className="current-lesson-box">
                            <div className="current-lesson-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Şu Anki Ders</span>
                            </div>
                            <div className="current-lesson-title">
                                {currentLesson['DERS']}
                            </div>
                            <div className="current-lesson-details">
                                <span>Saat:</span> {currentLesson['SAAT']} - <span>{currentLesson['ÖĞRETİM ÜYE']}</span>
                            </div>
                        </div>
                    )}
                    
                    {schedule.length > 0 ? (
                        <div className="lesson-list pure-g">
                            {schedule.map((lesson, index) => (
                                <div
                                    key={index}
                                    className={`pure-u-1 lesson-item ${currentLesson && currentLesson === lesson ? 'current-highlight' : ''}`}
                                >
                                    <div className="lesson-content pure-g">
                                        <div className="pure-u-1-2 pure-u-md-1-4">
                                            <span className="lesson-time">{lesson['SAAT']}</span>
                                        </div>
                                        <div className="pure-u-1-2 pure-u-md-3-4 lesson-info">
                                            <span className="lesson-name">{lesson['DERS']}</span>
                                            {lesson['TEMA'] && (
                                                <span className="lesson-tema">({lesson['TEMA']})</span>
                                            )}
                                            <div className="lesson-prof">
                                                <span>{lesson['ÖĞRETİM ÜYE']}</span>
                                                {lesson['T/P'] && (
                                                    <span className="lesson-type">({lesson['T/P']})</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-lesson-found">
                            <svg className="no-lesson-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5 9a1 1 0 011-1h1a1 1 0 010 2H6a1 1 0 01-1-1zm6 1a1 1 0 100-2h2a1 1 0 100 2h-2z" clipRule="evenodd" />
                            </svg>
                            <p className="no-lesson-text">Bugün için ders programı bulunamadı.</p>
                        </div>
                    )}
                </div>
            </main>
            <style jsx>{`
                .container {
                    min-height: 100vh;
                    background-color: #f5f5f5;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                .card {
                    max-width: 900px;
                    width: 100%;
                    background-color: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    padding: 2rem;
                }
                .header {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                .main-title {
                    font-size: 3rem;
                    font-weight: 800;
                    color: #1a202c;
                    margin-bottom: 0.5rem;
                }
                .subtitle {
                    font-size: 1.25rem;
                    color: #718096;
                    font-weight: 500;
                }
                .current-lesson-box {
                    background-color: #dbeafe;
                    border-left: 4px solid #3b82f6;
                    color: #1e40af;
                    padding: 1rem;
                    margin-bottom: 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                .current-lesson-icon {
                    display: flex;
                    align-items: center;
                    font-weight: bold;
                    font-size: 1.125rem;
                }
                .icon {
                    height: 1.5rem;
                    width: 1.5rem;
                    margin-right: 0.75rem;
                    color: #3b82f6;
                }
                .current-lesson-title {
                    margin-top: 0.5rem;
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: #1a202c;
                }
                .current-lesson-details {
                    font-size: 0.875rem;
                    color: #4a5568;
                }
                .current-lesson-details span {
                    font-weight: 600;
                }
                .lesson-list {
                    margin-top: 1rem;
                }
                .lesson-item {
                    padding: 1.5rem;
                    background-color: #f7fafc;
                    border-radius: 8px;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                    border: 1px solid #e2e8f0;
                    margin-bottom: 1rem;
                    transition: all 0.3s ease;
                }
                .lesson-item:hover {
                    background-color: #edf2f7;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                .current-highlight {
                    outline: 2px solid #3b82f6;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
                .lesson-content {
                    display: flex;
                    flex-direction: column;
                }
                .lesson-time {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #3b82f6;
                }
                .lesson-info {
                    flex-grow: 1;
                    margin-left: 1rem;
                }
                .lesson-name {
                    font-weight: bold;
                    color: #1a202c;
                    font-size: 1.125rem;
                }
                .lesson-tema {
                    font-size: 0.875rem;
                    color: #718096;
                    margin-left: 0.5rem;
                }
                .lesson-prof {
                    font-size: 0.875rem;
                    color: #4a5568;
                    margin-top: 0.5rem;
                }
                .lesson-type {
                    margin-left: 0.5rem;
                    font-weight: 500;
                }
                .no-lesson-found {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    text-align: center;
                    color: #a0aec0;
                }
                .no-lesson-icon {
                    height: 5rem;
                    width: 5rem;
                    color: #cbd5e0;
                }
                .no-lesson-text {
                    margin-top: 1rem;
                    font-size: 1.25rem;
                    color: #718096;
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
}