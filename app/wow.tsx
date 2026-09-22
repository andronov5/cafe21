"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, Utensils, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";

type Dish = { name: string; price: string; image: string; alt: string; tag: string };
const names = ["The Philly.", "The Club.", "The switch-up.", "The classic."];

export function HeroShowcase({ dishes }: { dishes: Dish[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update(); mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    api.on("select", update); update();
    return () => { api.off("select", update); };
  }, [api]);
  function tilt(e: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--tilt-x", `${((e.clientY-r.top)/r.height-.5)*-5}deg`);
    e.currentTarget.style.setProperty("--tilt-y", `${((e.clientX-r.left)/r.width-.5)*7}deg`);
  }
  function reset(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.style.setProperty("--tilt-x", "0deg");
    e.currentTarget.style.setProperty("--tilt-y", "0deg");
  }
  const dish = dishes[selected];
  return <div className="hero-showcase">
    <div className="showcase-orbit" aria-hidden="true"><span>21</span></div>
    <div className="food-deck" onPointerMove={tilt} onPointerLeave={reset}>
      <div className="deck-back deck-back-two" aria-hidden="true"><img src={`/images/${dishes[(selected+2)%dishes.length].image}`} alt=""/></div>
      <div className="deck-back deck-back-one" aria-hidden="true"><img src={`/images/${dishes[(selected+1)%dishes.length].image}`} alt=""/></div>
      <Carousel className="hero-carousel" opts={{loop:true,duration:reducedMotion?0:30}} setApi={setApi} aria-label="Find your next favorite dish" tabIndex={0}>
        <CarouselContent className="hero-slides">
          {dishes.map((item,i) => <CarouselItem className="hero-slide" key={item.name} aria-label={`${i+1} of ${dishes.length}: ${item.name}`} aria-hidden={i!==selected}>
            <div className="dish-photo"><img src={`/images/${item.image}`} alt={item.alt} width="614" height="621" fetchPriority={i===0?"high":undefined}/><div className="dish-shade"/><div className="dish-photo-copy"><span>{item.tag}</span><strong>{names[i]}</strong></div><span className="dish-photo-index">0{i+1} / 04</span></div>
          </CarouselItem>)}
        </CarouselContent>
        <div className="deck-arrows"><CarouselPrevious className="deck-arrow" aria-label="Previous featured dish"/><CarouselNext className="deck-arrow" aria-label="Next featured dish"/></div>
      </Carousel>
      <div className="deck-stamp" aria-hidden="true"><span>HOT OFF</span><b>THE<br/>MENU</b><span>CAFÉ 21 EXPRESS</span></div>
    </div>
    <div className="showcase-caption" aria-live="polite" aria-atomic="true"><div><span>YOUR NEXT GOOD DECISION</span><strong>{dish.name}</strong></div><b>${dish.price}</b></div>
    <div className="showcase-picker"><span>PICK YOUR<br/><b>CRAVING.</b></span><div className="dish-thumbnails">{dishes.map((item,i)=><button key={item.name} onClick={()=>api?.scrollTo(i,reducedMotion)} aria-label={`Show ${item.name}`} aria-pressed={selected===i}><img src={`/images/${item.image}`} alt=""/><span className="thumbnail-marker"/></button>)}</div><span className="swipe-hint"><ArrowLeft size={13}/><ArrowRight size={13}/><small>SWIPE</small></span></div>
  </div>;
}

export function SiteMotion() {
  const [floating,setFloating] = useState(false);
  const [active,setActive] = useState("");
  const raf=useRef(0);
  useEffect(()=>{
    const mq=window.matchMedia("(prefers-reduced-motion: reduce)");
    const scene=document.querySelector<HTMLElement>(".room-scene");
    const hero=document.querySelector<HTMLElement>(".hero");
    function update(){
      const max=document.documentElement.scrollHeight-window.innerHeight;
      document.documentElement.style.setProperty("--page-progress",`${max>0?window.scrollY/max:0}`);
      setFloating(!!hero&&hero.getBoundingClientRect().bottom<40);
      if(scene){const r=scene.getBoundingClientRect();const p=mq.matches?1:Math.min(1,Math.max(0,(window.innerHeight-r.top)/(window.innerHeight*.85)));scene.style.setProperty("--scene-progress",`${p}`);}
      raf.current=0;
    }
    function queue(){if(!raf.current)raf.current=requestAnimationFrame(update);}
    const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting)setActive(e.target.id);},{rootMargin:"-10% 0px -60% 0px",threshold:0});
    document.querySelectorAll("#menu,#our-place,#catering,#visit").forEach(el=>observer.observe(el));
    window.addEventListener("scroll",queue,{passive:true});window.addEventListener("resize",queue);mq.addEventListener("change",queue);update();
    return()=>{window.removeEventListener("scroll",queue);window.removeEventListener("resize",queue);mq.removeEventListener("change",queue);cancelAnimationFrame(raf.current);observer.disconnect();document.documentElement.style.removeProperty("--page-progress");};
  },[]);
  return <><div className="reading-progress" aria-hidden="true"/><nav className={`floating-menu ${floating?"floating-menu-visible":""}`} aria-label="Quick navigation" aria-hidden={!floating} inert={!floating}><a className="floating-brand" href="#main" aria-label="Back to top">21</a><a href="#menu" aria-current={active==="menu"?"location":undefined}><Utensils size={15}/>The menu</a><span/><a href="#visit" aria-current={active==="visit"?"location":undefined}><MapPin size={15}/>Find us</a><a href="tel:+13032973651" className="floating-call" aria-label="Call Cafe 21"><ArrowUpRight size={20}/></a></nav></>;
}
