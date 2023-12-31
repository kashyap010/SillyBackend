import { Router } from "express";
import {
	handleContactUs,
	handleNewsletter,
	handleStrucData,
	handleAllLocationCategories,
	handleGetAllCategories,
	handlePostCategories,
	handleGetMenuItems,
	handleGetMenuItemSubcategories,
	handleCategoryMeta,
	handlePostMenuItemSingle,
	handlePostMenuItemMultiple,
	handleUpdateMenuItemSingle,
	handleUpdateMenuItemMultiple,
	handleDeleteMenuItemSingle,
	handleDeleteMenuItemMultiple,
	handleLogin,
	handleGallery,
	handleUpdateMenuItemSubcategories,
	handlePostNewSubcategory,
} from "../controllers/index.js";
import { verifyToken } from "../middleware/index.js";

export function setupRoutes(app) {
	const router = Router();

	router.get("/", (req, res) => {
		res.send("Server running");
	});

	router.post("/contact-us", handleContactUs);

	router.post("/newsletter", handleNewsletter);

	router.get("/:location/structured-data", handleStrucData);

	router.get("/:location/gallery", handleGallery);

	// CATEGORIES ROUTES
	router.get("/categories/all", handleAllLocationCategories);

	router.get("/categories/:location", handleGetAllCategories);

	router.post("/categories/:location", handlePostCategories);

	// MENU ROUTES
	router.get("/menu/:location/:category", handleGetMenuItems);

	router.get(
		"/menu/:location/:category/subcategories",
		handleGetMenuItemSubcategories
	);

	router.get("/menu/:location/:category/meta", handleCategoryMeta);

	// router.post("/menu/:location/single", handlePostMenuItemSingle);

	router.post("/menu/:location/multiple", handlePostMenuItemMultiple);

	// router.patch("/menu/:location/single/:id", handleUpdateMenuItemSingle);

	router.patch("/menu/:location/multiple", handleUpdateMenuItemMultiple);

	// router.delete("/menu/:location/single/:id", handleDeleteMenuItemSingle);

	router.delete("/menu/:location/multiple", handleDeleteMenuItemMultiple);

	// ADMIN ROUTES
	router.post("/login", handleLogin);

	router.post("/menu/:location/single", verifyToken, handlePostMenuItemSingle);

	router.patch(
		"/menu/:location/single/:id",
		verifyToken,
		handleUpdateMenuItemSingle
	);

	router.delete(
		"/menu/:location/single/:id",
		verifyToken,
		handleDeleteMenuItemSingle
	);

	router.patch(
		"/menu/:location/:category/subcategories",
		handleUpdateMenuItemSubcategories
	);

	router.post(
		"/menu/:location/:category/subcategories",
		handlePostNewSubcategory
	);

	app.use("/", router);
}
