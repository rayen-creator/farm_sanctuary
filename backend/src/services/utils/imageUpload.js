const fs = require("fs");
const path = require("path");

const storeFS = ({ stream, filename }) => {
    const uploadDir = "public/images";
    name = `single${Math.floor(Math.random() * 10000 + 1)}`;
    const pathname = path.join(
        __dirname,
        `../../../public/images/${filename}`
    );
    return new Promise((resolve, reject) =>
        stream
            .on("error", (error) => {
                if (stream.truncated)
                    // delete the truncated file
                    fs.unlinkSync(pathname);
                reject(error);
            })
            .pipe(fs.createWriteStream(pathname))
            .on("error", (error) => reject(error))
            .on("finish", () => resolve({ pathname }))
    );
};

async function uploadImage (file){
    const {
        file: {filename, mimetype, encoding, createReadStream},
    } = file;

    let stream = createReadStream();
    const pathObj = await storeFS({stream, filename});
    console.log("File 1", pathObj.path);
    let fileLocation = pathObj.pathname;
    const baseUrl = process.env.BASE_URL;
    const port = process.env.PORT;
    const name = path.basename(fileLocation, path.extname(fileLocation));
    fileLocation = `${baseUrl}${port}/images/${filename}`;
    return fileLocation;
}


module.exports = uploadImage;
