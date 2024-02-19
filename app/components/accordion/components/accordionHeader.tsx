
export type AccordionHeaderType = {
    id: string,
    title: string,
    className?: string,
    contentId: string
}

const AccordionHeader = ({ id, className, title, contentId }: AccordionHeaderType) => {
    return (
        <h2 className="accordion-header" id={id}>
            <button className={`accordion-button collapsed ${className}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${contentId}`}>
                {title}
            </button>
        </h2>
    )
}

export default AccordionHeader