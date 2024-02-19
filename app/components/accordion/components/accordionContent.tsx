import { PropsWithChildren } from 'react'

export type AccordionContentType = {
    id: string,
    className?: string,
    accordionId: string
} & PropsWithChildren

const AccordionContent = ({ id, accordionId, className, children }: AccordionContentType) => {
    return (
        <div id={id} className="accordion-collapse collapse" data-bs-parent={`#${accordionId}`}>
            <div className={`accordion-body ${className}`}>
                {children}
            </div>
        </div>
    )
}

export default AccordionContent