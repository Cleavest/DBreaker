import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const SchemaViewer = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        <div className='bg-zinc-900 rounded-lg p-4 border border-zinc-800 space-y-4'>
            <h2 className='text-md mb-2 font-bold text-zinc-200'>Παραδείγματα Πινάκων</h2>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={16}
                slidesPerView={"auto"}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide className='table-thumb border hover:border-transparent border-zinc-700 hover:cursor-pointer hover:scale-[1.02] active:scale-[0.95] px-8 py-2 text-sm font-bold bg-[rgba(255,255,255,0.05)] hover:bg-[radial-gradient(ellipse_100%_100%_at_100%_80%,rgba(120,79,255,0.3),rgba(255,255,255,0.08))] rounded-xl !w-fit'>
                    <div className='text-white'>
                        <span>Student</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='table-thumb border hover:border-transparent border-zinc-700 hover:cursor-pointer hover:scale-[1.02] active:scale-[0.95] px-8 py-2 text-sm font-bold bg-[rgba(255,255,255,0.05)] hover:bg-[radial-gradient(ellipse_100%_100%_at_100%_80%,rgba(120,79,255,0.3),rgba(255,255,255,0.08))] rounded-xl !w-fit'>
                    <div className='text-white'>
                        <span>Course</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='table-thumb border hover:border-transparent border-zinc-700 hover:cursor-pointer hover:scale-[1.02] active:scale-[0.95] px-8 py-2 text-sm font-bold bg-[rgba(255,255,255,0.05)] hover:bg-[radial-gradient(ellipse_100%_100%_at_100%_80%,rgba(120,79,255,0.3),rgba(255,255,255,0.08))] rounded-xl !w-fit'>
                    <div className='text-white'>
                        <span>Grade</span>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className='bg-zinc-950 rounded p-4'>

                <Swiper
                    spaceBetween={10}
                    navigation={false}
                    thumbs={{ swiper: thumbsSwiper }}
                    allowTouchMove={false}
                    modules={[FreeMode, Navigation, Thumbs]}
                >
                    <SwiperSlide className="!h-fit">
                        <table className="w-full !overflow-x-auto block whitespace-nowrap text-sm text-left text-zinc-300">
                            <thead className="text-xs uppercase bg-zinc-800 text-zinc-200">
                                <tr>

                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">STUDENTID</th>
                                    <th className="px-4 py-3">FIRSTNAME</th>
                                    <th className="px-4 py-3">LASTNAME</th>
                                    <th className="px-4 py-3">EMAIL</th>
                                    <th className="px-4 py-3">ENROLLMENTYEAR</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className='bg-zinc-900'>
                                    <td className="px-4 py-2 border-t border-zinc-800">11</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">CS2001</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Γιώργος</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Παπαδόπουλος</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">gpapad@example.com</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">2020</td>
                                </tr>
                                <tr className='bg-zinc-950'>
                                    <td className="px-4 py-2 border-t border-zinc-800">12</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">CS2002</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Μαρία</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Κωνσταντίνου</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">mkons@example.com</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">2020</td>
                                </tr>
                                <tr className='bg-zinc-900'>
                                    <td className="px-4 py-2 border-t border-zinc-800">13</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">CS2003</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Νίκος</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Αλεξίου</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">nalex@example.com</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">2021</td>
                                </tr>
                            </tbody>
                        </table>
                    </SwiperSlide>
                    <SwiperSlide className="!h-fit">
                        <table className="w-full !overflow-x-auto block whitespace-nowrap text-sm text-left text-zinc-300">
                            <thead className="text-xs uppercase bg-zinc-800 text-zinc-200">
                                <tr>

                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">courseCode</th>
                                    <th className="px-4 py-3">title</th>
                                    <th className="px-4 py-3">department</th>
                                    <th className="px-4 py-3">credits</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className='bg-zinc-900'>
                                    <td className="px-4 py-2 border-t border-zinc-800">9</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">CS101</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Εισαγωγή στην Επιστήμη Υπολογιστών</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Πληροφορική</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">6</td>
                                </tr>
                                <tr className='bg-zinc-950'>
                                    <td className="px-4 py-2 border-t border-zinc-800">10</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">CS102</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Προγραμματισμός I</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Πληροφορική</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">6</td>
                                </tr>
                                <tr className='bg-zinc-900'>
                                    <td className="px-4 py-2 border-t border-zinc-800">11</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">CS201</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Δομές Δεδομένων</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Πληροφορική</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">6</td>
                                </tr>
                            </tbody>
                        </table>
                    </SwiperSlide>
                    <SwiperSlide className="!h-fit">
                        <table className="w-full !overflow-x-auto block whitespace-nowrap text-sm text-left text-zinc-300">
                            <thead className="text-xs uppercase bg-zinc-800 text-zinc-200">
                                <tr>

                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">STUDENTID</th>
                                    <th className="px-4 py-3">courseId</th>
                                    <th className="px-4 py-3">grade</th>
                                    <th className="px-4 py-3">semester</th>
                                    <th className="px-4 py-3">academicYear</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className='bg-zinc-900'>
                                    <td className="px-4 py-2 border-t border-zinc-800">40</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">11</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">9</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">5.4</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Χειμερινό</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">2020-2021</td>
                                </tr>
                                <tr className='bg-zinc-950'>
                                    <td className="px-4 py-2 border-t border-zinc-800">41</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">11</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">16</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">6.6</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Εαρινό</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">2020-2021</td>
                                </tr>
                                <tr className='bg-zinc-900'>
                                    <td className="px-4 py-2 border-t border-zinc-800">42</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">11</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">14</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">5.5</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">Εαρινό</td>
                                    <td className="px-4 py-2 border-t border-zinc-800">2020-2021</td>
                                </tr>
                            </tbody>
                        </table>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default SchemaViewer;
