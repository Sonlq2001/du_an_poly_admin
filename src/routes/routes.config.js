import { DASHBOARD_ROUTES } from "./../features/dashboard/routes/dashboard.routes";
import { CONFIRM_ROUTES } from "./../features/confirm/routes/confirm.routes";
import { USER_LIST_ROUTES } from "././../features/user/routes/user.routes";

export const LIST_ROUTES = [
	...USER_LIST_ROUTES,
	...CONFIRM_ROUTES,
	...DASHBOARD_ROUTES,
];