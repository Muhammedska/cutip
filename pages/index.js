import ders from 'data/ders.json';

export default function Home() {
    const today = new Date();
    // Günü ve ayı iki basamaklı formatta al
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
        <main className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:scale-[1.01]">
                <header className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">Günün Ders Programı</h1>
                    <p className="text-xl text-gray-500 font-medium">
                        {formattedDate}
                    </p>
                </header>

                {currentLesson && (
                    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-4 mb-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-bold text-lg">Şu Anki Ders</span>
                        </div>
                        <div className="mt-2 text-xl md:text-2xl font-bold text-gray-900">
                            {currentLesson['DERS']}
                        </div>
                        <div className="text-sm md:text-base text-gray-600">
                            <span className="font-semibold">Saat:</span> {currentLesson['SAAT']} - <span className="font-semibold">{currentLesson['ÖĞRETİM ÜYE']}</span>
                        </div>
                    </div>
                )}
                
                {schedule.length > 0 ? (
                    <div className="space-y-4">
                        {schedule.map((lesson, index) => (
                            <div
                                key={index}
                                className={`p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:shadow-md ${currentLesson && currentLesson === lesson ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="flex items-center mb-2 md:mb-0">
                                        <span className="text-base font-semibold text-gray-600 mr-2">Saat:</span>
                                        <span className="text-xl font-bold text-blue-600">{lesson['SAAT']}</span>
                                    </div>
                                    <div className="flex-grow md:mx-4">
                                        <span className="font-bold text-gray-800 text-lg">{lesson['DERS']}</span>
                                        {lesson['TEMA'] && (
                                            <span className="text-sm text-gray-500 ml-2">({lesson['TEMA']})</span>
                                        )}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 mt-2 md:mt-0">
                                        <span>{lesson['ÖĞRETİM ÜYE']}</span>
                                        {lesson['T/P'] && (
                                            <span className="ml-2 font-medium">({lesson['T/P']})</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
                        <svg className="h-20 w-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5 9a1 1 0 011-1h1a1 1 0 010 2H6a1 1 0 01-1-1zm6 1a1 1 0 100-2h2a1 1 0 100 2h-2z" clipRule="evenodd" />
                        </svg>
                        <p className="mt-4 text-xl text-gray-500 font-medium">Bugün için ders programı bulunamadı.</p>
                    </div>
                )}
            </div>
        </main>
    );
}

