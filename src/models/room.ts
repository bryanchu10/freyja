import { Schema, model, type Document } from 'mongoose';
import validator from 'validator';
import itemSchema, { IItem } from './schema/item';

export interface ImageList {
    url: string;
    mobileUrl: string;
    alt: string;
}

export interface IRoom extends Document {
    name: string;
    description: string;
    imageList: ImageList[];
    areaInfo: string;
    bedInfo: string;
    maxPeople: number;
    price: number;
    // 可使用：1，已刪除：-1
    status: number;
    layoutInfo: IItem[];
    facilityInfo: IItem[];
    amenityInfo: IItem[];
}

const roomSchema = new Schema<IRoom>(
    {
        name: {
            type: String,
            required: [true, 'name 未填寫']
        },
        description: {
            type: String,
            required: [true, 'description 未填寫']
        },
        imageList: [
            {
                url: {
                    type: String,
                    trim: true,
                    validate: {
                        validator(value: string) {
                            return validator.isURL(value, { protocols: ['https'] });
                        },
                        message: 'imageList.url 格式不正確'
                    }
                },
                mobileUrl: {
                    type: String,
                    trim: true,
                    validate: {
                        validator(value: string) {
                            return validator.isURL(value, { protocols: ['https'] });
                        },
                        message: 'imageList.mobileUrl 格式不正確'
                    }
                },
                alt: {
                    type: String,
                }
            }
        ],
        areaInfo: {
            type: String,
            required: [true, 'areaInfo 未填寫']
        },
        bedInfo: {
            type: String,
            required: [true, 'bedInfo 未填寫']
        },
        maxPeople: {
            type: Number,
            required: [true, 'maxPeople 未填寫'],
            validate: {
                validator(value: number) {
                    return validator.isInt(`${value}`, { min: 1 });
                },
                message: 'maxPeople 格式不正確'
            }
        },
        price: {
            type: Number,
            required: [true, 'price 未填寫']
        },
        status: {
            type: Number,
            default: 1
        },
        layoutInfo: {
            type: [itemSchema],
            default: []
        },
        facilityInfo: {
            type: [itemSchema],
            default: []
        },
        amenityInfo: {
            type: [itemSchema],
            default: []
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('room', roomSchema);
