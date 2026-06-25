import Link from 'next/link'
import React from 'react'
const dash=[
    {name:"Mes Produit", href:"li"},
    {name:"Dettes Client", href:"li"},
    {name:"Mes Dettes", href:"li"},
    {name:"Produit Endommagé", href:"li"},
{name:"TchatBoot", href:"li"}
]

function Sidebar() {
  return (
<ul className='menu bg-blue-600 text-white w-64 min-h-screen p-4  rounded-none hidden lg:block'>
<li className='text-2xl font-bold mb-9'>
{dash.map((das)=>(
    <li key={das.name} className='mt-4'>
        <Link href={das.href}>{das.name}</Link>
    </li>
))}
</li>
</ul>    
)
}

export default Sidebar