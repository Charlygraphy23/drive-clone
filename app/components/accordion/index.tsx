"use client"

import { PropsWithChildren, useId } from "react"
import AccordionContent, { AccordionContentType } from "./components/accordionContent"
import AccordionHeader, { AccordionHeaderType } from "./components/accordionHeader"

type Props = {
    button: Omit<AccordionHeaderType, "id" | "contentId">,
    className?: string,
    content?: Omit<AccordionContentType, "id" | "accordionId">
} & PropsWithChildren

const Accordion = ({ button, children, className }: Props) => {
    const accordionId = "accordion_" + useId()
    const collapseId = "collapseContent"
    const headerId = "header_" + useId()




    return (
        <div className={`accordion ${className}`} id={accordionId}>
            <div className="accordion-item">
                <AccordionHeader id={headerId} contentId={collapseId} {...button} />

                <AccordionContent id={collapseId} accordionId={accordionId}>
                    {children}
                </AccordionContent>
            </div>
        </div>
    )
}

export default Accordion