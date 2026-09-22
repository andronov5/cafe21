"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import { favorites } from "./cafe-data";
export function FavoriteCarousel() {
  const [api,setApi] = useState<CarouselApi>();const [selected,setSelected] = useState(0);const [reducedMotion,setReducedMotion] = useState(false);
  useEffect(()=>{const mq=window.matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setReducedMotion(mq.matches);update();mq.addEventListener("change",update);return()=>mq.removeEventListener("change",update);},[]);
  useEffect(()=>{if(!api)return;const update=()=>setSelected(api.selectedScrollSnap());api.on("select",update);update();return()=>{api.off("select",update);};},[api]);
  return <Carousel className="favorites-carousel" opts={{align:"start",loop:true,duration:reducedMotion?0:25}} setApi={setApi} aria-label="A few cafe favorites" tabIndex={0}><CarouselContent className="favorites-track">{favorites.map((food,i)=><CarouselItem className="favorite-slide" key={food.name} aria-label={`${i+1} of ${favorites.length}: ${food.name}`}><a href="/menu" className="favorite-card"><div className="favorite-photo"><img src={`/images/${food.image}`} alt={food.alt} width="614" height="621" loading="lazy"/><span className="favorite-heart" aria-hidden="true"><Heart size={21} strokeWidth={1.4}/></span></div><div className="favorite-caption"><h3>{food.name}</h3><ArrowRight size={20}/></div><p>{food.description}</p></a></CarouselItem>)}</CarouselContent><div className="carousel-controls"><span>Find your new favorite</span><div className="carousel-dots" aria-label="Choose a favorite">{favorites.map((food,i)=><button key={food.name} className={selected===i?"active":""} onClick={()=>api?.scrollTo(i,reducedMotion)} aria-label={`Show ${food.name}`} aria-pressed={selected===i}/>)}</div><div className="carousel-arrows"><CarouselPrevious className="carousel-arrow" aria-label="Previous favorites"/><CarouselNext className="carousel-arrow" aria-label="Next favorites"/></div></div></Carousel>;
}
