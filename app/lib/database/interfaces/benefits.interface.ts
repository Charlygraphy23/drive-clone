
export const PLAN_BENEFITS = {
    "benefit_1": {
        maxSize: ((1 * 1024) * 1024) * 1024, // 1GB
        downloads: 100
    },

    "benefit_2": {
        maxSize: (((1 * 1024) * 1024) * 1024) * 5, // 5GB
        downloads: 200
    },

    "benefit_3": {
        maxSize: (((1 * 1024) * 1024) * 1024) * 10, // 5GB
        downloads: 500
    },

}


export interface BenefitsSchemaType {
    title: string;
    maxSize: number;
    downloads: number;
    displayPoints: string[]
}

export interface BenefitsDocumentType extends BenefitsSchemaType, Document { }