import { i as stringType, n as enumType, r as objectType, t as booleanType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services.schemas-U1PpKNTi.js
var SERVICE_ICON_NAMES = [
	"Target",
	"Megaphone",
	"Bot",
	"Search",
	"Gem",
	"GraduationCap",
	"ChartNoAxesCombined",
	"Palette",
	"Code2"
];
var serviceInputSchema = objectType({
	title: stringType().trim().min(2, "Use at least 2 characters.").max(100),
	text: stringType().trim().min(10, "Use at least 10 characters.").max(300),
	icon: enumType(SERVICE_ICON_NAMES)
});
var serviceIdSchema = objectType({ id: stringType().uuid("Invalid service ID.") });
var updateServiceSchema = serviceInputSchema.extend({ id: serviceIdSchema.shape.id });
var servicePublishSchema = serviceIdSchema.extend({ isPublished: booleanType() });
var serviceReorderSchema = serviceIdSchema.extend({ direction: enumType(["up", "down"]) });
//#endregion
export { serviceReorderSchema as a, servicePublishSchema as i, serviceIdSchema as n, updateServiceSchema as o, serviceInputSchema as r, SERVICE_ICON_NAMES as t };
