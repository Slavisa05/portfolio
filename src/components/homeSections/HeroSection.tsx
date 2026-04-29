import Button from "../ui/Button";
import ProjectCard from "../ui/ProjectCard";

export default function HeroSection() {
    return(
        <section className="min-h-screen w-full px-[5vw] pt-35 flex">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-5">
                    <div className="inline-flex items-center gap-2 self-start border border-card-border bg-card text-muted text-xs font-medium uppercase tracking-widest px-3 py-1.5 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        Dostupan za nove projekte
                    </div>

                    <h1>Sajtovi koji rade za tvoj biznis</h1>

                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <Button text="pogledaj projekte" variant="secondary" />
                        <Button text="radi sa mnom" />
                    </div>

                    <p className="text-muted -mt-2">*odgovaram u roku od 24h</p>
                </div>

                <div className="flex items-center justify-center relative h-130">
                    {/* Kartica pozadi lijevo */}
                    <div className="absolute top-16 left-4 -rotate-6 z-10">
                        <ProjectCard
                            title="Salon App"
                            image="/salonapp_termini.png"
                            url="slavisadev.com/salon"
                            description="Sistem za zakazivanje termina u frizerskom salonu sa kalendarom i upravljanjem slobodnim terminima."
                            tags={["Django", "PostgreSQL", "VPS Hosting"]}
                            accent="#10b981"
                            index={0}
                        />
                    </div>

                    {/* Kartica u sredini ispred */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 rotate-2 z-20">
                        <ProjectCard
                            title="Elaralabs"
                            image="/elaralabs_hero.png"
                            url="elaralabs.rs"
                            description="Landing stranica za prirodno labelo sa 3D animacijama proizvoda i sekcijom za narudžbine."
                            tags={["next.js", "Drag & Drop", "Shopify"]}
                            accent="#06b6d4"
                            index={1}
                        />
                    </div>

                    {/* Kartica pozadi desno */}
                    <div className="absolute top-24 right-0 -rotate-3 z-10">
                        <ProjectCard
                            title="WMS Sistem"
                            image="/wms_dashboard.png"
                            url="slavisadev.com/wms"
                            description="WMS dashboard za upravljanje skladištem, inventarom, transportom i dokumentima."
                            tags={["React.JS", "Django", "PostgreSQL"]}
                            accent="#6366f1"
                            index={2}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}