
const target = new Date("2026-11-07T00:00:00+08:00").getTime();
function tick(){const now=Date.now(),diff=target-now;if(diff<=0){["days","hours","minutes","seconds"].forEach(id=>document.getElementById(id).textContent="00");document.getElementById("countdown-message").textContent="Today is the day! Let the celebration begin.";return}
const vals={days:Math.floor(diff/86400000),hours:Math.floor(diff%86400000/3600000),minutes:Math.floor(diff%3600000/60000),seconds:Math.floor(diff%60000/1000)};
Object.entries(vals).forEach(([id,v])=>document.getElementById(id).textContent=String(v).padStart(2,"0"))}
tick();setInterval(tick,1000);




const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbyLK4PuFiOSbPm8BmEJxmeg6oF6eEHG_ZnvcIiNURCNBPb2uAy_-GiGafpNFv_eZ2I/exec";

const rsvpForm = document.getElementById("rsvp-form");
const rsvpStatus = document.getElementById("success");
const rsvpFrame = document.getElementById("rsvp-response-frame");

let submissionPending = false;

function showRsvpStatus(message, isError = false) {
  rsvpStatus.textContent = message;
  rsvpStatus.classList.toggle("is-error", isError);
  rsvpStatus.style.display = "block";
}

rsvpForm.addEventListener("submit", function(event) {
  event.preventDefault();

  if (!rsvpForm.reportValidity()) return;

  const button = rsvpForm.querySelector('button[type="submit"]');

  if (submissionPending) return;

  submissionPending = true;
  button.disabled = true;
  button.textContent = "Sending your reply...";

  showRsvpStatus("Sending your RSVP. Please wait...");

  rsvpForm.action = RSVP_ENDPOINT;
  rsvpForm.method = "POST";
  rsvpForm.target = "rsvp-response-frame";

  // Submit without fetch or CORS access
  HTMLFormElement.prototype.submit.call(rsvpForm);

  // Do not claim success just because the form was submitted.
  // Cross-origin iframe responses cannot reliably confirm the save.
  setTimeout(() => {
    if (submissionPending) {
      showRsvpStatus(
        "Your response was sent. Please contact the host if you are unsure whether it was received.",
        false
      );
      button.disabled = false;
      button.textContent = "Send my response ✧";
      submissionPending = false;
    }
  }, 10000);
});



const galleryPhotos=[
  {src:"images/1.jpg",alt:"Reona Cassandra celebration photo 1"},
  {src:"images/1-2.jpg",alt:"Reona Cassandra celebration photo 2"},
  {src:"images/1-3.jpg",alt:"Reona Cassandra celebration photo 3"},
  {src:"images/1-4.jpg",alt:"Reona Cassandra celebration photo 4"},
  {src:"images/1-5.jpg",alt:"Reona Cassandra celebration photo 5"},
  {src:"images/1-6.jpg",alt:"Reona Cassandra celebration photo 6"},
  {src:"images/1-7.jpg",alt:"Reona Cassandra celebration photo 7"},
  {src:"images/1-8.jpg",alt:"Reona Cassandra celebration photo 8"},
  {src:"images/1-9.jpg",alt:"Reona Cassandra celebration photo 9"},
  {src:"images/1-10.jpg",alt:"Reona Cassandra celebration photo 10"},
  {src:"images/1-11.jpg",alt:"Reona Cassandra celebration photo 11"}
];
const gallery=document.getElementById("photo-gallery");
const galleryStage=document.querySelector(".carousel-stage");
const galleryImage=document.getElementById("gallery-image");
const lightbox=document.getElementById("photo-lightbox");
const lightboxImage=document.getElementById("lightbox-image");
const dots=document.getElementById("gallery-dots");
let photoIndex=0;
document.getElementById("gallery-total").textContent=String(galleryPhotos.length).padStart(2,"0");
function renderPhoto(){
  const photo=galleryPhotos[photoIndex];
  const number=String(photoIndex+1).padStart(2,"0");
  galleryStage.style.setProperty("--photo-background",`url("${photo.src}")`);
  galleryImage.src=photo.src;galleryImage.alt=photo.alt;
  document.getElementById("gallery-current").textContent=number;
  document.getElementById("gallery-caption").textContent=photo.alt;
  document.getElementById("gallery-open").setAttribute("aria-label",`View photo ${photoIndex+1} full size`);
  dots.querySelectorAll("button").forEach((dot,index)=>{
    const active=index===photoIndex;
    dot.classList.toggle("is-active",active);
    if(active)dot.setAttribute("aria-current","true");else dot.removeAttribute("aria-current");
  });
  if(lightbox.open)renderLightboxPhoto();
}
function renderLightboxPhoto(){
  const photo=galleryPhotos[photoIndex];
  const number=String(photoIndex+1).padStart(2,"0");
  lightboxImage.src=photo.src;lightboxImage.alt=photo.alt;
  document.getElementById("lightbox-caption").textContent=`${number} / ${galleryPhotos.length} · ${photo.alt}`;
}
galleryPhotos.forEach((photo,index)=>{
  const dot=document.createElement("button");
  dot.type="button";dot.setAttribute("aria-label",`Show photo ${index+1} of ${galleryPhotos.length}`);
  dot.addEventListener("click",()=>{photoIndex=index;renderPhoto();});
  dots.appendChild(dot);
});
function movePhoto(direction){photoIndex=(photoIndex+direction+galleryPhotos.length)%galleryPhotos.length;renderPhoto();}
document.getElementById("gallery-prev").addEventListener("click",()=>movePhoto(-1));
document.getElementById("gallery-next").addEventListener("click",()=>movePhoto(1));
gallery.addEventListener("keydown",event=>{
  if(event.key==="ArrowLeft"){event.preventDefault();movePhoto(-1);}
  if(event.key==="ArrowRight"){event.preventDefault();movePhoto(1);}
});
document.getElementById("gallery-open").addEventListener("click",()=>{renderPhoto();lightbox.showModal();renderLightboxPhoto();});
document.getElementById("lightbox-close").addEventListener("click",()=>lightbox.close());
document.getElementById("lightbox-prev").addEventListener("click",()=>movePhoto(-1));
document.getElementById("lightbox-next").addEventListener("click",()=>movePhoto(1));
lightbox.addEventListener("click",event=>{if(event.target===lightbox)lightbox.close();});
lightbox.addEventListener("keydown",event=>{
  if(event.key==="ArrowLeft"){event.preventDefault();movePhoto(-1);}
  if(event.key==="ArrowRight"){event.preventDefault();movePhoto(1);}
});
renderPhoto();
document.getElementById("rsvp-form").addEventListener("submit",e=>{e.preventDefault();document.getElementById("success").style.display="block";});
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduced){
  const glitterColors=["","glitter-pink","glitter-purple"];
  for(let i=0;i<18;i++){
    const glitter=document.createElement("span");
    glitter.className=`glitter ${glitterColors[i%glitterColors.length]}`;
    glitter.textContent=i%3===0?"✦":"✧";
    glitter.setAttribute("aria-hidden","true");
    glitter.style.left=`${4+Math.random()*92}vw`;
    glitter.style.top=`${5+Math.random()*90}vh`;
    glitter.style.fontSize=`${8+Math.random()*11}px`;
    glitter.style.animationDelay=`${Math.random()*4}s`;
    glitter.style.animationDuration=`${2.2+Math.random()*2.8}s`;
    document.body.appendChild(glitter);
  }
  const symbols=["✧","·","♡","🦋"];
  setInterval(()=>{const p=document.createElement("span");p.className="petal";p.textContent=symbols[Math.floor(Math.random()*symbols.length)];p.style.left=Math.random()*100+"vw";p.style.fontSize=(10+Math.random()*13)+"px";p.style.animationDuration=(8+Math.random()*8)+"s";document.body.appendChild(p);setTimeout(()=>p.remove(),17000)},1100);
}
