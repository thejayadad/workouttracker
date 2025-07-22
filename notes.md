
```
import Link from 'next/link'
import React from 'react'
import { FiLink, FiGithub, FiLinkedin, FiYoutube } from 'react-icons/fi'

const LandingPage = () => {

  return (
    <div className='relative min-h-screen overflow-x-hidden'>
        <header className='screen-line-after sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-dotted border-neutral-200'>
            <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-1 md:border-x border-neutral-200">
                <Link 
                className='text-xl font-bold'
                href={'/'}>
                    theJayadad
                </Link>
                <div className='flex items-center justify-center gap-4'>
                    <Link 
                    className="group relative flex flex-col items-center justify-center text-xs font-medium text-foreground/70 duration-150 hover:text-primary lg:text-sm"
                    href={'/'}>
                        <span className='mb text-primary'>Home</span>
                        <span
                        className="absolute -bottom-px h-[1px] rounded-full bg-primary transition-all duration-150 w-full group-hover:w-full"
                        >
                        </span>
                    </Link>
                </div>
            </div>
        </header>
        <main 
        className="mx-auto min-h-[100vh-120px] max-w-3xl"
        >
            <div
            className="screen-line-before screen-line-after relative flex h-4 w-full border-neutral-200 md:border-x before:absolute before:-left-[100vw]  before:h-full before:w-[200vw] before:bg-[image:radial-gradient(var(--pattern-foreground)_2px,_transparent_2px)] before:bg-[size:15px_15px] before:[--pattern-foreground:var(--color-black)]/5 dark:before:[--pattern-foreground:var(--color-white)]/5 h-14"
            >
            </div>
            <div
            className="screen-line-after relative flex items-center p-4 md:border-x border-neutral-200"
            >
                <div
                className="shrink-0"
                >
                    <div
                    className='relative z-1 mx-0.5 my-1'
                    >
                        {/* Image placeholder */}
                        <div
                        className='w-32 h-32 sm:w-40 sm:h-40 relative rounded-full overflow-hidden'>
                            <div className="bg-gray-300 w-full h-full"></div>
                        </div>
                    </div>
                </div>
                {/* Content Section next to the image */}
                <div className='flex flex-col pl-4'>
                    <div className='flex flex-col items-start'>
                        <div className='line-clamp-1 font-mono text-xs text-muted-foreground'>
                            Inspiring, Learning, Creating...
                        </div>
                        <div>
                            <h1 className='flex items-center gap-x-2 text-2xl font-black'>TheJayadad</h1>
                            <div className="py-1">
                                <p className='text-sm !font-normal'>
                                    Software Engineer / Full-stack Developer
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dotted Border Spanning Full Width */}
            <div
            className="relative flex items-center border-t-2 border-dotted border-neutral-200 w-full mt-4"
            >
            </div>

        
        </main>
    </div>
  )
}

export default LandingPage

```

```
import Link from 'next/link'
import React from 'react'
import { FiLink, FiGithub, FiLinkedin, FiYoutube } from 'react-icons/fi'

const LandingPage = () => {

  return (
    // <div className='relative min-h-screen overflow-x-hidden'>
    //     <header className='sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-dotted border-neutral-200'>
    //         <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-1 md:border-x border-neutral-200">
    //             <Link 
    //             className='text-xl font-bold'
    //             href={'/'}>
    //                 theJayadad
    //             </Link>
    //             <div className='flex items-center justify-center gap-4'>
    //                 <Link 
    //                 className="group relative flex flex-col items-center justify-center text-xs font-medium text-foreground/70 duration-150 hover:text-primary lg:text-sm"
    //                 href={'/'}>
    //                     <span className='mb text-primary'>Home</span>
    //                     <span
    //                     className="absolute -bottom-px h-[1px] rounded-full bg-primary transition-all duration-150 w-full group-hover:w-full"
    //                     >
    //                     </span>
    //                 </Link>
    //             </div>
    //         </div>
    //     </header>
        
    //    <main className='mx-auto min-h-[calc(100vh-120px)]'>
    //     <div className='border-b w-full border-dotted border-neutral-200'>
    //                   <div
    //         className='screen-line-before bg-transparent screen-line-after relative flex h-4 w-full md:border-x before:absolute border-dotted before:-left-[100vw] before:h-full before:w-[200vw] before:bg-[image:radial-gradient(var(--pattern-foreground)_2px,_transparent_2px)] before:bg-[size:15px_15px] before:[--pattern-foreground:var(--color-black)]/5 dark:before:[--pattern-foreground:var(--color-white)]/5 h-14 border-neutral-200'
    //         >

    //         </div>
    //     </div>
    //     <section className='border border-dotted'>
    //         Next Section
    //     </section>
    //    </main>
    // </div>

    <div className='relative min-h-screen overflow-x-hidden'>
            <header className='sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-dotted border-neutral-200'>
             <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-1 md:border-x border-neutral-200 border-dotted">
                <Link 
                 className='text-xl font-bold'
                 href={'/'}>
                     theJayadad
                 </Link>
                 <div className='flex items-center justify-center gap-4'>
                     <Link 
                     className="group relative flex flex-col items-center justify-center text-xs font-medium text-foreground/70 duration-150 hover:text-primary lg:text-sm"
                     href={'/'}>
                         <span className='mb text-primary'>Home</span>
                         <span
                         className="absolute -bottom-px h-[1px] rounded-full bg-primary transition-all duration-150 w-full group-hover:w-full"
                         >
                         </span>
                     </Link>
                 </div>
             </div>
         </header>
         <main  className="mx-auto min-h-[calc(100vh-100px)] max-w-3xl">
            
            <div
            className='screen-line-before border-b md:border-b w-full border-neutral-200 border-dotted screen-line-after relative flex h-4 w-full md:border-x before:absolute before:-left-[100vw] before:h-full before:w-[200vw] before:bg-[image:radial-gradient(var(--pattern-foreground)_2px,_transparent_2px)] before:bg-[size:15px_15px] before:[--pattern-foreground:var(--color-black)]/5  h-14'
            >
            </div>
            <div
            className="screen-line-after relative flex items-center p-4 md:border-x mx-auto max-w-3xl border-neutral-200 border-dotted"
            >
                <div className='shrink-0'>
                    Image Info
                </div>
            </div>
            <div 
            className='border-t border-dotted border-neutral-200 w-full'
            >
                <div className="p-4 text-sm space-y-3">
                    Items
                </div>
            </div>

         </main>
    </div>
  )
}

export default LandingPage

```