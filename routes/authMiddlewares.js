// Everything inside authMiddlewares is security, rights, access etc. Request->Middleware->Routehandler->Response
module.exports =
{
    // This function checks if the user is logged in
    isAuthenticated: function(req, res, next)
    {
        if (!req.user)
        {
            // If user is not logged in, the guest is redirected back to login-page
            return res.redirect('/login');
        }
        // If the user is logged in, next() function is run
        next();
    },

    // Checks if a user is admin. User-roles are admin or member
    isAdmin: function(req, res, next)
    {
        // Checks if a user is logged in
        if (!req.user)
        {
            return res.redirect('/login');
        }

        // Checks if the user is admin
        if (req.user.role === 'admin')
        {
            // If admin, next() function is run
            return next();
        }

        // If the user is not admin, an error-message occours
        return res.status(403).send('Access denied');
    },

    // Checks if the user-role is a member
    isMember: function(req, res, next)
    {
        // If user is logged in
        if (!req.user)
        {
            return res.redirect('/login');
        }

        // If the user is a member
        if (req.user.role === 'member')
        {
            // Next() is called
            return next();
        }

        // If the user is not a member, the user get's the message: 'Only members can adopt'
        return res.status(403).send('Only members can adopt');
    }
};
