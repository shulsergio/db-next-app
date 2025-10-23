const ACCESS_MAP = {
  admin: {
    canAccessAdminPanel: true,
    canAccessAllRegionsData: true,
    canViewUsersData: true,
    canViewUsersPlans: true,
    // canEditUsers: true,
    // canDeleteUsers: true,
  },
  rffm: {
    canAccessAdminPanel: true,
    canAccessAllRegionsData: false,
    canViewUsersData: true,
    canViewUsersPlans: true,
  },
  promoter: {
    canViewUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canAccessAdminPanel: false,
    canViewReports: false,
  },
};

export default ACCESS_MAP;

// ------needd else
//   merchendiser: {
//   canAccessAdminPanel: true,
//   canAccessAllRegionsData: false,
//   canViewUsersData: true,
//   canViewUsersPlans: true,
//   },
//   trainer: {
//   canAccessAdminPanel: true,
//   canAccessAllRegionsData: false,
//   canViewUsersData: true,
//   canViewUsersPlans: true,
//   },
