import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import ExpressError from "./ExpressError";

const storage = multer.diskStorage({});
export const upload = multer({ storage });

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
	secure: true,
});

export const uploadImage = async (file: any) => {
	// Use the uploaded file's name as the asset's public ID and
	// allow overwriting the asset with new versions

	const options = {
		use_filename: true,
		unique_filename: false,
		overwrite: true,
	};

	try {
		// Upload the image
		const result = await cloudinary.uploader.upload(file.path, options);

		return result.url;
	} catch (error) {
		console.error(error);
	}
};

export const uploadImages = async (files: any) => {
	if (!files && files.length == 0) {
		throw new ExpressError("No files uploaded", 400);
	}

	let filesArr = files.map((file: any) => file.path);
	const results = await Promise.all(
		filesArr.map((filePath: string) => {
			return new Promise((resolve, reject) => {
				const options = {
					use_filename: true,
					unique_filename: false,
					overwrite: true,
				};

				try {
					cloudinary.uploader
						.upload(filePath, options)
						.then((result) => {
							resolve(result.url);
						});
				} catch (error) {
					console.error(error);
				}
			});
		})
	);
	return results;
};
