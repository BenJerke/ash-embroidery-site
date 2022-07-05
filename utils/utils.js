import fs from 'fs';
import path from 'path';

//get the product image directory
const imageDirectory = path.join(process.cwd(), 'public/images/product_images');
console.log(imageDirectory);

export async function getCarouselPicData() {
    
    const imageFiles = fs.readdirSync(imageDirectory);

    return imageFiles.map(fileName => {
        return {            
                source: fileName,
                //height: 400, 
                //width: 400, 
        };
    });

}