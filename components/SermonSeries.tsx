import {
    Play,
    Radio,
    CalendarDays,
    FileText,
    ArrowRight,
} from "lucide-react";

export default function SermonSeries() {
    return (
        <section className="bg-[#292a27] px-4 py-16 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* =========================================
            SECTION HEADER
        ========================================== */}

                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        {/* Small Label */}
                        <div className="flex items-center gap-2">

                            <Radio className="h-3.5 w-3.5 text-[#e0b83f]" />

                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e0b83f]">
                                Current Sermon Series
                            </span>

                        </div>

                        {/* Main Heading */}
                        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
                            Walking in the Covenant
                        </h2>

                    </div>


                    {/* Archive Link */}
                    <button className="group flex items-center gap-2 text-sm font-semibold text-[#e3bb43] transition hover:text-[#f0ce6a]">

                        Browse Sermon Archive

                        <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        />

                    </button>

                </div>


                {/* =========================================
            SERMON CARD
        ========================================== */}

                <div className="mt-10 rounded-xl bg-[#41423e] p-4 shadow-xl sm:p-6 lg:p-7">

                    <div className="grid gap-7 lg:grid-cols-[1fr_1.05fr] lg:items-center">


                        {/* =====================================
                LEFT — VIDEO / IMAGE
            ====================================== */}

                        <div className="relative overflow-hidden rounded-lg">

                            <img
                                src="/images/workshiptakingmomentpaster.jpeg"
                                alt="Sermon being preached in church"
                                className="h-[240px] w-full object-cover sm:h-[280px] lg:h-[235px]"
                            />


                            {/* Dark Image Overlay */}
                            <div className="absolute inset-0 bg-black/10" />


                            {/* Play Button */}
                            <button
                                aria-label="Play sermon"
                                className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#a80f22] text-white shadow-xl transition duration-300 hover:scale-110 hover:bg-[#c0132a]"
                            >
                                <Play className="ml-1 h-6 w-6 fill-current" />
                            </button>


                            {/* Bottom Image Label */}
                            <div className="absolute bottom-3 left-3 rounded-md bg-black/65 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                                Part IV • Grace in the Wilderness
                            </div>

                        </div>


                        {/* =====================================
                RIGHT — SERMON DETAILS
            ====================================== */}

                        <div>

                            {/* Recorded Info */}
                            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#e1b73b]">

                                <CalendarDays className="h-3.5 w-3.5" />

                                <span>
                                    Recorded Live This Past Sunday • 38 minutes
                                </span>

                            </div>


                            {/* Sermon Title */}
                            <h3 className="mt-5 font-serif text-2xl leading-tight text-white sm:text-3xl">
                                Finding Peace When the Storm Rages
                            </h3>


                            {/* Bible Verse Box */}
                            <div className="mt-5 rounded-md bg-[#62635f] px-5 py-4">

                                <p className="font-serif text-base italic leading-7 text-[#f0cd68]">
                                    “The Lord is my shepherd; I shall not want. He makes me
                                    lie down in green pastures; He leads me beside still waters.”
                                </p>

                                <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#ddd9d0]">
                                    — Psalm 23:1–2
                                </p>

                            </div>


                            {/* Minister */}
                            <div className="mt-5 flex items-center gap-3">

                                {/* Initial Circle */}
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c7a849] text-xs font-bold text-white">
                                    
                                        <img src="/images/pastor.jpeg" className="h-full w-full rounded-full object-cover" alt="Pastor Image" />
                                    
                                    {/* <iframe src="https://youtu.be/wycNrUjlTi4?si=uzXQrzFzJKNOMEjL" sandbox="allow-scripts allow-forms" title="Secure Sandbox Frame"></iframe> */}
                                </div>


                                <div>

                                    <p className="text-sm font-semibold text-white">
                                        Rev. Samuel Issac Newton J
                                    </p>

                                    <p className="text-xs text-[#d0ccc4]">
                                        Senior Pastor
                                    </p>

                                </div>

                            </div>


                            {/* Buttons */}
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                                {/* Listen */}
                                <button className="flex items-center justify-center gap-2 rounded-md bg-[#a80f22] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#c0132a]">

                                    <Play className="h-3.5 w-3.5 fill-current" />

                                    Listen to Message (38m)

                                </button>


                                {/* PDF */}
                                <button className="flex items-center justify-center gap-2 rounded-md bg-[#666762] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#74756f]">

                                    <FileText className="h-3.5 w-3.5" />

                                    Study Notes (PDF)

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}