import{r as o,j as s,L as t,B as n,k as i,t as d,b as c}from"./index-DuoP-K8E.js";const m=({user:e})=>{const[r,l]=o.useState(!1);return s.jsxs("div",{className:"w-full max-w-sm m-auto flex items-center justify-between border border-dark-4 rounded-2xl bg-dark-2 p-4",children:[s.jsx(t,{to:`/profile/${e?.$id}`,className:" ",children:s.jsxs("div",{className:"flex items-center gap-3 overflow-hidden",children:[s.jsx("img",{src:e?.imageUrl||"/assets/icons/profile-placeholder.svg",alt:e?.name,className:"w-14 h-14 rounded-full object-cover border border-dark-4"}),s.jsxs("div",{className:"flex flex-col overflow-hidden",children:[s.jsx("p",{className:"base-medium text-light-1 truncate",children:e.name}),s.jsxs("p",{className:"small-regular text-light-3 truncate",children:["@",e.username]})]})]})}),s.jsx(n,{type:"button",size:"sm",className:`
            px-5 py-2
            rounded-full
            hover:scale-105 
            transition-transform
            cursor-pointer
            
          `,onClick:()=>l(!r),style:{backgroundColor:r?"#FF7425":"#877EFF"},children:r?"Following":"Follow"})]})},u=()=>{const{data:e,isLoading:r,isError:l}=i();if(l){d("Something went wrong.");return}return s.jsx("div",{className:"common-container",children:s.jsxs("div",{className:"user-container",children:[s.jsx("h2",{className:"h3-bold md:h2-bold text-left w-full",children:"All Users"}),r&&!e?s.jsx(c,{}):s.jsx("ul",{className:"grid grid-cols-1 gap-4",children:e?.documents.map(a=>s.jsx("li",{className:"flex-1 min-w-[200px] w-full  ",children:s.jsx(m,{user:a})},a?.$id))})]})})};export{u as default};
