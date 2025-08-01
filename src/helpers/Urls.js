export const mainDomain = 'https://corestaging.bluecaller.com/';
export const imgUrl = 'https://corestaging.bluecaller.com';

export const Urls = {
  get: {
    countries: mainDomain + 'api/country',
    states: mainDomain + 'api/state/',
    cities: mainDomain + 'api/city',
    education: mainDomain + 'api/education',
    interest: mainDomain + 'api/interest',
    language: mainDomain + 'api/language',
    university: mainDomain + 'api/university',
    skills: mainDomain + 'api/skills',
    tradetype: mainDomain + 'api/tradeCategory',
    cattradetype: mainDomain + 'api/tradeTypeCat',
    subcattradetype: mainDomain + 'api/tradeTypeSubCat',
    getAllProposals: mainDomain + 'api/aiproposals',
    getAllUsers: mainDomain + 'api/user',
    reports: mainDomain + 'api/report',
    getSingleUser: mainDomain + 'api/user/userSingleRecord/',
    getAllIssueReport: mainDomain + 'api/user/allReports',
    getAllProject: mainDomain + 'api/project/getAllProjectsAdmin',
    getSingleProject: mainDomain + 'api/project/singleRecord/',
    getSingleIssueReport: mainDomain + 'api/user/report/',
    getSingleBidsData: mainDomain + 'api/bid/getAllBidAdmin/',
    getBadges: mainDomain + 'api/badge',
    singleBadge: mainDomain + 'api/badge/',
    badgeRequestAll: mainDomain + 'api/badge/get-badge-request',
    getAllMilestonesList: mainDomain + 'api/project/projectDetails',
    getSingleMilestoneInfo: mainDomain + 'api/project//projectDetails/',
    userBankDetails: mainDomain + 'api/payment/bankDetails',
    userSingleBankDetails: mainDomain + 'api/payment/singleDetail/',
    skillCategory: mainDomain + 'api/skillCategory',
    singleSkillCategory: mainDomain + 'api/skillCategory/single/',
    skillCategoryExport: mainDomain + 'api/skillCategory/exportCSV',
    countryExport: mainDomain + 'api/country/exportCSV',
    dashboard: mainDomain + 'api/dashboard',
    singalCountry: mainDomain + 'api/country/singleRecord/',
    getAllSubAdmin: mainDomain + 'api/user/getAllMenus',
    getSingleSubAdmin: mainDomain + 'api/subAdmin/subAdminById/',
    currentUserRole: mainDomain + 'api/user/current-user'
  },
  put: {
    updateCountry: mainDomain + 'api/country/',
    updateState: mainDomain + 'api/state/',
    updateCity: mainDomain + 'api/city/',
    updateEducation: mainDomain + 'api/education/',
    updateInterest: mainDomain + 'api/interest/',
    updateSkills: mainDomain + 'api/skills/',
    updateUniversity: mainDomain + 'api/university/',
    updateLanguage: mainDomain + 'api/language/',
    updateTradeType: mainDomain + 'api/tradeCategory/',
    updateCatTradeType: mainDomain + 'api/tradeTypeCat/',
    updateSubCatTradeType: mainDomain + 'api/tradeTypeSubCat/',
    updateProposal: mainDomain + 'api/aiproposals/',
    updateReasons: mainDomain + 'api/report/',
    updateBadge: mainDomain + 'api/badge',
    updateSkillCategory: mainDomain + 'api/skillCategory/update/',
    skillCategoryStatus: mainDomain + 'api/skillCategory/status/',
    badgeStatus: mainDomain + 'api/badge/status/',
    updateSubAdmin: mainDomain + 'api/subAdmin/updateSubAdmin/',
    statusUpdateSubadmin: mainDomain + 'api/subAdmin/updateSubadminStatus/'
  },
  post: {
    userLogin: mainDomain + 'api/user/login',
    addcountries: mainDomain + 'api/country',
    addstate: mainDomain + 'api/state',
    addcity: mainDomain + 'api/city',
    addeducation: mainDomain + 'api/education',
    addinterest: mainDomain + 'api/interest',
    addskills: mainDomain + 'api/skills',
    adduniversity: mainDomain + 'api/university',
    addlanguage: mainDomain + 'api/language',
    addTradeType: mainDomain + 'api/tradeCategory',
    addCatTradeType: mainDomain + 'api/tradeTypeCat',
    addSubCatTradeType: mainDomain + 'api/tradeTypeSubCat',
    addStatus: mainDomain + 'api/status',
    generateProposal: mainDomain + 'api/aiproposals/generateAI',
    addProposal: mainDomain + 'api/aiproposals',
    addReport: mainDomain + 'api/report',
    waitingListStatus: mainDomain + 'api/user/verify-referral',
    addBadge: mainDomain + 'api/badge/addBadge',
    statusChangeBadgeRequest: mainDomain + 'api/userBadge/approve-reject-badge',
    addSkillCategory: mainDomain + 'api/skillCategory/add',
    coutriesImports: mainDomain + 'api/country/importCSV',
    skillsImport: mainDomain + 'api/skills/importCSV',
    skillCategoryImport: mainDomain + 'api/skillCategory/importCSV',
    educationImport: mainDomain + 'api/education/importCSV',
    interestImport: mainDomain + 'api/interest/importCSV',
    languageImport: mainDomain + 'api/language/importCSV',
    badgeImport: mainDomain + 'api/badge/importCSV',
    universityImport: mainDomain + 'api/university/importCSV',
    tradeTypeImport: mainDomain + 'api/tradeCategory/importCSV',
    reportImport: mainDomain + 'api/report/importCSV',
    // tradeTypeCategoryImport: mainDomain + 'api/tradeTypeCat/importCSV'
    addSubAdmin: mainDomain + 'api/user/createSubAdmin'
  },
  delete: {
    deleteCountry: mainDomain + 'api/country/',
    deleteState: mainDomain + 'api/state/',
    deleteCity: mainDomain + 'api/city/',
    deleteEducation: mainDomain + 'api/education/',
    deleteInterest: mainDomain + 'api/interest/',
    deleteSkills: mainDomain + 'api/skills/',
    deleteUniversity: mainDomain + 'api/university/',
    deleteLanguage: mainDomain + 'api/language/',
    deleteTradeType: mainDomain + 'api/tradeCategory/',
    deleteCatTradeType: mainDomain + 'api/tradeTypeCat/',
    deleteSubCatTradeType: mainDomain + 'api/tradeTypeSubCat',
    deleteProposal: mainDomain + 'api/aiproposals',
    deleteReason: mainDomain + 'api/report/',
    deleteBadge: mainDomain + 'api/badge/',
    deleteSkillCate: mainDomain + 'api/skillCategory/markedAsDelete/',
    deleteSubAdmin: mainDomain + 'api/subAdmin/deleteSubAdmin/'
  }
};
