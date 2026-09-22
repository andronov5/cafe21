"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDown, MapPin, Phone, Plus, Minus, Menu, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const phone = "tel:+13032973651";
const directions = "https://www.google.com/maps/search/?api=1&query=Cafe+21+Express+999+18th+St+Suite+101+Denver+CO+80202";
const foods = [
  { name: "Philly Cheesesteak", tag: "THE LUNCH-BREAK CLASSIC", price: "8.99", image: "Beef-Philly-Cheesesteak-3.webp", alt: "Cafe 21's Philly cheesesteak with melted cheese", description: "Big sandwich energy. A little escape from the everyday." },
  { name: "Club Combo", tag: "STACKED WITH THE GOOD STUFF", price: "8.99", image: "Club-Combo-2.webp", alt: "Two halves of Cafe 21's club sandwich with lettuce and tomato", description: "Layers worth slowing down for. Your midday reset, stacked." },
  { name: "Shrimp Fried Rice", tag: "SWITCH UP YOUR USUAL", price: "11.59", image: "Shrimp-Fried-Rice-1.webp", alt: "Cafe 21 shrimp fried rice with vegetables", description: "A warm, colorful change of pace for your lunch break." },
  { name: "Cheeseburger", tag: "A VERY GOOD IDEA", price: "6.29", image: "Cheese-burger.webp", alt: "Cafe 21 cheeseburger with lettuce, tomato and pickles", description: "The kind of classic that needs no introduction." },
];
const breakfast = [
  ["Super Burrito", "Bacon, sausage, ham, eggs, hash brown, green chile & cheese", "7.49"],
  ["Breakfast Burrito", "Your choice of bacon, ham or sausage", "5.49"],
  ["Breakfast Panini", "Bacon, egg, American & tomato, or ham, egg, Swiss & tomato", "5.49"],
  ["Bacon, Egg & Cheese", "A breakfast sandwich that gets right to it", "4.79"],
  ["Bagel & Cream Cheese", "Keep your morning simple", "2.89"],
  ["Regular Coffee", "12 oz · 20 oz $2.49", "2.19"],
];
const moreLunch = [
  ["California Croissant", "8.69"], ["BLT", "7.99"], ["French Dip", "8.69"], ["Garden Burger", "6.39"], ["Chicken Fried Rice", "10.59"], ["Chicken Teriyaki & Egg Rolls", "12.59"], ["Shrimp Lo Mein", "11.59"], ["Salad Bar · 38 oz", "9.49"], ["Egg Rolls", "2.99"], ["French Fries", "2.99"],
];

function Star({ className = "" }: { className?: string }) { return <span className={`star ${className}`} aria-hidden="true">✳</span>; }

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [meal, setMeal] = useState("lunch");
  const [expandedFood, setExpandedFood] = useState<number | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const closeNav = () => setMobileOpen(false);
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="topline"><span>DOWNTOWN DENVER, DONE DELICIOUSLY.</span><span>BREAKFAST 7:30–11 <span className="top-divider">/</span> LUNCH 11–2:30</span></div>
      <header className="header">
        <a className="brand" href="#" aria-label="Cafe 21 Express home">café<span className="brand-number">21</span><span className="brand-express">EXPRESS</span></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#menu">The menu</a><a href="#our-place">Our place</a><a href="#catering">Catering</a><a href="#visit">Find us</a></nav>
        <a className="button button-small header-cta" href="#menu">LET’S EAT <ArrowUpRight size={18}/></a>
        <button className="mobile-toggle" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close navigation" : "Open navigation"}>{mobileOpen ? <X/> : <Menu/>}</button>
      </header>
      {mobileOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation"><a href="#menu" onClick={closeNav}>The menu</a><a href="#our-place" onClick={closeNav}>Our place</a><a href="#catering" onClick={closeNav}>Catering</a><a href="#visit" onClick={closeNav}>Find us</a><a href={phone}>303-297-3651</a></nav>}
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="small-line"/> YOUR DOWNTOWN GO-TO, SINCE 1997</p>
            <h1 id="hero-title">BIG FLAVOR.<br/>SMALL <span className="headline-star" aria-hidden="true">✳</span><br/><span className="outline-word">BREAK.</span></h1>
            <p className="hero-description">A proper breakfast. A lunch worth stepping out for.<br className="desktop-break"/> Your little corner of delicious in downtown Denver.</p>
            <div className="hero-actions"><a className="button" href="#menu">FIND YOUR FAVORITE <ArrowUpRight size={21}/></a><a href="#visit" className="text-link">Come on over <ArrowUpRight size={18}/></a></div>
            <div className="hero-location"><MapPin size={15}/><span>999 18th St · Inside Denver Place</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo-wrap"><img className="hero-photo" src="/images/Beef-Philly-Cheesesteak-3.webp" alt="A close-up of Cafe 21 Express's Philly cheesesteak, covered in melted cheese" fetchPriority="high" width="614" height="621"/><div className="photo-shade"/><div className="photo-caption"><span>MEET YOUR NEXT LUNCH BREAK.</span><strong>The Philly.<ArrowUpRight size={32}/></strong></div></div>
            <div className="hero-sticker"><span>GOOD FOOD</span><Star/><span>GOOD MOOD</span></div>
            <span className="hero-since">DENVER, CO · EST. 1997</span>
            <a href="#menu" className="hero-price" aria-label="Explore the menu. Philly cheesesteak 8 dollars and 99 cents"><span>PHILLY CHEESESTEAK</span><strong>$8.99</strong><ArrowUpRight/></a>
          </div>
          <a className="scroll-cue" href="#menu"><ArrowDown size={17}/><span>GOOD THINGS BELOW</span></a>
        </section>
        <div className="ticker" aria-label="Breakfast, lunch, catering. Made for your day."><div className="ticker-track" aria-hidden="true">{[0,1,2,3].map(i => <span key={i}>BREAKFAST <Star/> LUNCH <Star/> CATERING <Star/> MADE FOR YOUR DAY <Star/></span>)}</div></div>
        <section className="menu-section section-pad" id="menu" aria-labelledby="menu-title">
          <div className="section-top reveal"><div><p className="eyebrow">01 / SOMETHING GOOD IS COOKING</p><h2 id="menu-title">YOUR USUAL.<br/><span className="text-lime">OR YOUR NEXT.</span></h2></div><p className="section-intro">From your first bite of the morning to your midday escape. There’s more than one way to make your day.</p></div>
          <Tabs value={meal} onValueChange={setMeal} className="meal-tabs">
            <div className="menu-controls"><TabsList className="meal-tab-list" aria-label="Choose breakfast or lunch"><TabsTrigger value="breakfast" className="meal-tab">Breakfast <span>7:30–11 AM</span></TabsTrigger><TabsTrigger value="lunch" className="meal-tab">Lunch <span>11 AM–2:30 PM</span></TabsTrigger></TabsList><span className="menu-note">A few good places to start.</span></div>
            <TabsContent value="lunch" className="menu-content">
              <div className="food-grid">{foods.map((food, i) => <article className="food-card" key={food.name}><div className="food-image-wrap"><img src={`/images/${food.image}`} alt={food.alt} width="614" height="621" loading="lazy"/><span className="food-price">${food.price}</span><span className="food-count">0{i+1}</span></div><div className="food-copy"><p className="food-tag">{food.tag}</p><div className="food-name-row"><h3>{food.name}</h3><button className="food-expand" aria-label={`${expandedFood === i ? "Hide" : "Show"} ${food.name} details`} aria-expanded={expandedFood === i} aria-controls={`food-${i}`} onClick={() => setExpandedFood(expandedFood === i ? null : i)}>{expandedFood === i ? <Minus size={21}/> : <Plus size={21}/>}</button></div>{expandedFood === i && <p className="food-description" id={`food-${i}`}>{food.description}<a href={phone}>Call to order <ArrowUpRight size={15}/></a></p>}</div></article>)}</div>
              {showMore && <div className="more-menu" id="more-lunch">{moreLunch.map(([name, price]) => <div key={name}><span>{name}</span><strong>${price}</strong></div>)}</div>}
              <div className="menu-bottom"><button className="text-link light-link" onClick={() => setShowMore(!showMore)} aria-expanded={showMore} aria-controls="more-lunch">{showMore ? "A little less menu" : "More to love on the menu"}{showMore ? <Minus size={18}/> : <Plus size={18}/>}</button><a className="text-link light-link" href="https://www.cafe21express.com/menu-lunch/" target="_blank" rel="noreferrer">Full lunch menu <ArrowUpRight size={18}/></a></div>
            </TabsContent>
            <TabsContent value="breakfast" className="menu-content"><div className="breakfast-layout"><div className="breakfast-title"><Star/><h3>GOOD<br/>MORNING,<br/><span>DENVER.</span></h3><p>Start with something worth waking up for.</p></div><div className="breakfast-list">{breakfast.map(([name, description, price]) => <div className="breakfast-item" key={name}><div><h3>{name}</h3><p>{description}</p></div><strong>${price}</strong></div>)}</div></div><div className="menu-bottom"><span>Breakfast served 7:30–11 AM</span><a className="text-link light-link" href="https://www.cafe21express.com/menu-breakfast-2/" target="_blank" rel="noreferrer">Full breakfast menu <ArrowUpRight size={18}/></a></div></TabsContent>
          </Tabs>
          <p className="price-note">Prices shown from our published menu. Availability and prices may change.</p>
        </section>
        <section className="place-section section-pad" id="our-place" aria-labelledby="place-title"><div className="place-images reveal"><img className="place-main" src="/images/Green-room-seating-with-couches.webp" alt="The Green room at Denver Place, with a living green wall and cafe seating" width="900" height="1200" loading="lazy"/><div className="place-label">A LITTLE GREEN.<br/>A LITTLE PEACE.</div><img className="place-detail" src="/images/Outside-seating-of-round-table-and-seats.webp" alt="Comfortable booth seating surrounded by curved wooden dividers at Denver Place" width="900" height="1200" loading="lazy"/><span className="image-caption">YOUR TABLE IS WAITING.</span></div><div className="place-copy reveal"><p className="eyebrow">02 / A GOOD PLACE TO LAND</p><h2 id="place-title">STEP OUT.<br/>SETTLE IN.<br/><span className="text-orange">STAY A BIT.</span></h2><p>Some days you need a quick bite. Some days you need a real break. You can have both.</p><p>Find us on the ground floor of Denver Place’s North Tower. Grab your favorite, find a seat in the Green room, and let the city carry on for a minute.</p><a className="text-link" href="#visit">Find your way here <ArrowUpRight size={19}/></a><div className="since-lockup"><strong>1997</strong><span>THE YEAR WE STARTED.<br/>STILL YOUR DOWNTOWN SPOT.</span></div></div></section>
        <section className="catering-section" id="catering" aria-labelledby="catering-title"><div className="catering-copy reveal"><p className="eyebrow">03 / GOOD FOOD. GOOD COMPANY.</p><h2 id="catering-title">FEED THE<br/>WHOLE <span className="outline-word">CREW.</span></h2><p>The meeting. The team lunch. The just-because.<br/>Bring Café 21 to the table with catering for your group.</p><a className="button" href={phone}>LET’S TALK CATERING <ArrowUpRight size={22}/></a><span className="catering-note">303-297-3651 · Ask for Jessica</span></div><div className="catering-visual"><img src="/images/Club-Combo-2.webp" width="576" height="299" alt="Cafe 21 club sandwiches ready to share over lunch" loading="lazy"/><div className="catering-badge"><Star/><span>BETTER<br/>TOGETHER.</span></div><span className="catering-photo-label">LESS PLANNING. MORE LUNCH.</span></div></section>
        <section className="visit-section section-pad" id="visit" aria-labelledby="visit-title"><div className="visit-heading reveal"><p className="eyebrow">04 / SEE YOU AT 21</p><h2 id="visit-title">RIGHT HERE.<br/>RIGHT <span className="text-orange">ON.</span></h2><p>In the middle of downtown.<br/>A little outside your usual routine.</p><a className="button" href={directions} target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowUpRight size={21}/></a></div><div className="visit-info reveal"><div className="info-address"><MapPin size={24}/><div><h3>COME ON OVER</h3><p>999 18th Street, Suite 101<br/>Denver, CO 80202</p><span>Denver Place · North Tower · Ground floor</span></div></div><div className="hours"><div><span>BREAKFAST</span><strong>7:30 <small>AM</small><i>—</i>11 <small>AM</small></strong></div><div><span>LUNCH</span><strong>11 <small>AM</small><i>—</i>2:30 <small>PM</small></strong></div></div><div className="visit-phone"><span>GIVE US A RING</span><a href={phone}>303-297-3651 <ArrowUpRight size={23}/></a></div></div></section>
        <section className="faq-section section-pad"><div><p className="eyebrow">A FEW GOOD THINGS TO KNOW</p><h2>BEFORE YOU<br/>SWING BY.</h2></div><Accordion type="single" collapsible className="faq-list"><AccordionItem value="find"><AccordionTrigger>Where exactly are you?</AccordionTrigger><AccordionContent>We’re at 999 18th Street, Suite 101, on the ground floor of the North Tower at Denver Place in downtown Denver.</AccordionContent></AccordionItem><AccordionItem value="cater"><AccordionTrigger>Can you cater for a group?</AccordionTrigger><AccordionContent>Yes! Call <a href={phone}>303-297-3651</a> and ask for Jessica to talk about your group and catering options.</AccordionContent></AccordionItem><AccordionItem value="diet"><AccordionTrigger>Do you have gluten-free options?</AccordionTrigger><AccordionContent>Yes, gluten-free options are available. Please speak with the café about your dietary needs before ordering.</AccordionContent></AccordionItem><AccordionItem value="delivery"><AccordionTrigger>Can I get delivery?</AccordionTrigger><AccordionContent>You can look for Café 21 Express on DoorDash, Uber Eats, or Ritual. Availability is shown by each service. Call the café if you need help with an order.</AccordionContent></AccordionItem></Accordion></section>
      </main>
      <footer className="footer"><div className="footer-top"><span>YOUR NEXT GOOD BREAK STARTS HERE.</span><a href="#main" className="back-top">BACK TO TOP <ArrowUpRight size={18}/></a></div><a href="#menu" className="footer-wordmark" aria-label="Cafe 21 Express menu">café21<Star/></a><div className="footer-bottom"><span>© {new Date().getFullYear()} Café 21 Express</span><span>DENVER, CO · SINCE 1997</span><a href="https://www.facebook.com/people/Cafe-21-Express/61560865275557/" target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={15}/></a></div></footer>
    </>
  );
}
