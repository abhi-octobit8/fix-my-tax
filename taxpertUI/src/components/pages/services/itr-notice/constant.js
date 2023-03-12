const sectionData = {
  data: {
    "131-1A": {
      subSections: {
        "REPLY IN RESPONSE TO SUMMON NOTICE": {
          price: 5100,
        },
      },
    },
    "133-6": {
      subSections: {
        "REPLY IN RESPONSE TO NOTICE (DIRECT RELATED TO ASSESSEE BY A.O.)": {
          price: 3100,
        },
        "REPLY IN RESPONSE TO NOTICE (RELATED TO THIRD PARTY INFORMATION / CONFIRMATION)":
          {
            price: 2100,
          },
        "REPLY IN RESPONSE TO NOTICE (RAISED BY ADI OR DI OFFICE)": {
          price: 7100,
        },
      },
    },
    "142-1": {
      subSections: {
        "BUSINESS CLOSED INFORMATION": {
          price: 2100,
        },
        "FOR FILING RETURN OF INCOME - RETURN FILED": {
          price: 5100,
        },
        "FOR FILING RETURN OF INCOME - RETURN NOT FILED": {
          price: 7100,
        },
        "FOR FURNISHING OF DETAILS AS PROVIDED I.E. ACCOUNTS AND DOCUMENTS FOR ASSESSMENT":
          {
            price: 11000,
          },
        "OTHERS NOTICES": {
          price: 11000,
        },
      },
    },
    "143(2)": {
      subSections: {
        "REPLY FOR COMPLIANCE": {
          price: 3100,
        },
      },
    },
    "143-1": {
      subSections: {
        "FOR RECTIFICATION OF DEMAND RAISED VIDE INTIMATION 143-1": {
          price: 2100,
        },
      },
    },
    144: {
      subSections: {
        "REPLY IN RESPONSE TO NOTICE - NOT RESPONDED": {
          price: 11000,
        },
        "REPLY IN RESPONSE TO NOTICE - RESPONDED": {
          price: 7100,
        },
        "OTHERS NOTICES": {
          price: 11000,
        },
      },
    },
    "148A": {
      subSections: {
        "REPLY IN RESPONSE TO NOTICE": {
          price: 21000,
        },
      },
    },
    156: {
      subSections: {
        "REPLY IN RESPONSE TO NOTICE": {
          price: 1100,
        },
      },
    },
    "176 - 3": {
      subSections: {
        "INTIMATION FOR DISCONTINUATION OF BUSINESS": {
          price: 5100,
        },
      },
    },
    "210 - 3": {
      subSections: {
        "REPLY FOR DEPOSIT OF ADVANCE TAX": {
          price: 2100,
        },
      },
    },
    221: {
      subSections: {
        "REPLY IN RESPONSE TO NOTICE": {
          price: 5100,
        },
      },
    },
    245: {
      subSections: {
        "REPLY IN RESPONSE TO NOTICE - SIMPLE REPLY": {
          price: 2100,
        },
        "REPLY IN RESPONSE TO NOTICE - EARLIER DEMAND ADJUSTED WITH REFUND": {
          price: 5100,
        },
        "OTHERS NOTICES": {
          price: 7100,
        },
      },
    },
    "271-1-c": {
      subSections: {
        "REPLY IN RESPONSE TO NOTICE - APPEAL NOT FILED": {
          price: 11000,
        },
        "REPLY IN RESPONSE TO NOTICE - APPEAL FILED": {
          price: 8100,
        },
        "OTHERS NOTICES": {
          price: 11000,
        },
        "NOTICES UNDER OTHER SECTIONS": {
          price: 5100,
        },
        "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE": {
          price: 1100,
        },
      },
    },
  },
};
const FIELD_NAME = {
  NAME: "name",
  EMAIL: "email",
  SERVICE: "service",
  SECTION: "section",
  SUBSECTION: "subsection",
  NOTICE_SELECTION: "selectedNotice",
  SELECT_TIME: "date-time-picker",
  UPLOAD_NOTICE: "uploadNotice",
  UPLOAD_ITR: "uploadITR",
  PHONE_NUMBER: "phoneNumber",
};

export { sectionData, FIELD_NAME };
