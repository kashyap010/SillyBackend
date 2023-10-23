import { Contact } from "./contact.schema.js";
import { Menu } from "./menu.schema.js";
import { Category } from "./category.schema.js";

export async function saveContactInquiry(formData) {
	try {
		const newEntry = new Contact(formData);
		console.log(newEntry);
		await newEntry.save();
		return {
			success: true,
			message: "Contact form inquiry saved successfully.",
		};
	} catch (error) {
		return { success: false, error };
	}
}

// CATEGORIES
export async function getAllLocationCats(location) {
	try {
		const resp = await Category.find();
		console.log(resp);
		// const data = resp.categories.map((cat) => {
		// 	if (cat.visible) return cat.name;
		// });

		return {
			success: true,
			data,
		};
	} catch (error) {
		return {
			success: false,
			error: error,
		};
	}
}

export async function getAllCategories(location) {
	try {
		const resp = await Category.findOne({ location });
		const data = resp.categories.map((cat) => {
			if (cat.visible) return cat.name;
		});

		return {
			success: true,
			data,
		};
	} catch (error) {
		return {
			success: false,
			error: error,
		};
	}
}

export async function createOrUpdateCategories(location, categories) {
	try {
		let existingCategory = await Category.findOne({ location });

		if (!existingCategory) {
			existingCategory = new Category({ location, categories });
		} else {
			existingCategory.categories = categories;
		}

		const savedCategory = await existingCategory.save();
		return {
			success: true,
			data: savedCategory,
		};
	} catch (error) {
		return {
			success: false,
			error: error,
		};
	}
}

// MENU
export async function getMenuByCategory(location, category) {
	try {
		const menuItems = await Menu.find({ location, category, visible: true });

		return {
			success: true,
			data: menuItems,
		};
	} catch (error) {
		return {
			success: false,
			error: error,
		};
	}
}

export async function getMenuSubcategories(location, category) {
	try {
		// Use the 'distinct' method to get unique subcategories for the specified category
		const subcategories = await Menu.distinct("subcategory", {
			location,
			category,
			visible: true,
		});

		return {
			success: true,
			data: subcategories,
		};
	} catch (error) {
		return {
			success: false,
			error: error,
		};
	}
}

export async function getCatMeta(location, category) {
	try {
		const resp = await Category.findOne({ location });
		const data = resp.categories.filter((cat) => cat.name === category);
		const meta = data[0].desc;

		return {
			success: true,
			data: meta,
		};
	} catch (error) {
		return {
			success: false,
			error: error,
		};
	}
}

export async function addMenuItem(menuItemData) {
	try {
		const newMenuItem = new Menu(menuItemData);
		const createdMenuItem = await newMenuItem.save();

		return {
			success: true,
			data: createdMenuItem,
		};
	} catch (error) {
		return {
			success: false,
			error: error,
		};
	}
}

export async function addMultipleMenuItems(location, menuItems) {
	try {
		const createdMenuItems = await Menu.insertMany(
			menuItems.map((item) => ({
				...item,
				location,
				price: item.price.toString(),
			}))
		);

		return {
			success: true,
			data: createdMenuItems,
		};
	} catch (error) {
		return {
			success: false,
			error: error,
		};
	}
}

export async function updateMenuItem(location, id, updatedData) {
	try {
		const updatedMenuItem = await Menu.findOneAndUpdate(
			{ _id: id, location },
			{ $set: updatedData },
			{ new: true } // Return the updated document
		);

		if (!updatedMenuItem) {
			return {
				success: false,
				error: { message: "Menu item not found or location mismatch" },
			};
		}

		return {
			success: true,
			data: updatedMenuItem,
		};
	} catch (error) {
		return {
			success: false,
			error: error,
		};
	}
}

export async function updateMultipleMenuItems(location, updatedMenuItems) {
	try {
		const bulkOps = updatedMenuItems.map((updatedItem) => ({
			updateOne: {
				filter: { name: updatedItem.name, location },
				update: { $set: updatedItem },
				upsert: true,
			},
		}));

		const result = await Menu.bulkWrite(bulkOps);

		return {
			success: true,
			data: result.modifiedCount,
		};
	} catch (error) {
		return {
			success: false,
			error: error,
		};
	}
}

export async function deleteMenuItemSingle(location, id) {
	try {
		const result = await Menu.deleteOne({ _id: id, location });

		return {
			success: result.deletedCount === 1,
		};
	} catch (error) {
		return {
			success: false,
			error: error,
		};
	}
}
