const ACCESS_MAP = {
  admin: {
    canAccessAdminPanel: true,
    canAccessPromsListData: true, //canAccessAllRegionsData
    canVisiblePromsListAllData: true,
    canVisiblePromsListData: false,
    // canViewUsersData: true,
    canViewUsersPlans: true,
    canViewUsersFocus: true,
    // canEditUsers: true,
    // canDeleteUsers: true,
  },
  rmUser: {
    canAccessAdminPanel: true,
    canAccessPromsListData: true, //canAccessAllRegionsData
    canVisiblePromsListAllData: false,
    canVisiblePromsListData: true,
    // canViewUsersData: true,
    canViewUsersPlans: true,
    canViewUsersFocus: true,
  },
  rffm: {
    canAccessAdminPanel: true,
    canAccessPromsListData: true, //canAccessAllRegionsData
    canVisiblePromsListAllData: false,
    canVisiblePromsListData: true,
    // canViewUsersData: false,
    canViewUsersPlans: true,
    canViewUsersFocus: true,
  },
  promoter: {
    canAccessAdminPanel: false,
    canViewUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canViewReports: false,
    canAccessPromotersPanel: true,
    canViewUsersFocus: true,
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
