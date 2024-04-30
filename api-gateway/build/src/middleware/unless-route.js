"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware to conditionally apply another middleware unless the route matches a specific path
function unless(path, middleware) {
    return (req, res, next) => {
        if (req.path.startsWith(path)) {
            return next();
        }
        else {
            middleware(req, res, next);
        }
    };
}
exports.default = unless;
//# sourceMappingURL=unless-route.js.map