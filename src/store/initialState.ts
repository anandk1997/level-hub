export const initialState: IRootState = {
  submittalDrawing: {
    userData: {
      formatID: 'jpg',
      location: 'Stafford, Texas',
      language: 'English',
      customer: '',
      poNumber: '',
      title: '',
      assemblyNo: '',
      salesOrder: '',
      requestedBy: '',
      vin: '',
      projectName: '',
      serialNumber: '',
      tagNumber: '',
      notes: '',
    },
    tagData: {
      lastModified: 'select a tag',
      setPressure: 'select a tag',
      quantity: 'select a tag',
      model: 'select a tag',
      catalogString: 'select a tag',
    },
    tagSummary: {
      customer: 'select a tag',
      company: 'select a tag',
      projectName: 'select a tag',
      setPressure: 'select a tag',
      model: 'select a tag',
      catalogString: 'select a tag',
    },
    error: {
      enterInfo: {
        customer: [],
        poNumber: [],
        title: [],
        assemblyNo: [],
        salesOrder: [],
        requestedBy: [],
        vin: [],
        projectName: [],
        serialNumber: [],
        tagNumber: [],
        notes: [],
        sizing_id: [],
        config_id: [],
      },
    },
    loading: false,
    sizing_id: '',
    config_id: '0200019920_000010',
  },

  apiData: {
    drawingUrl: '',
    cadFileUrl: '',
    views: [],
    formatList: [],
    locations: [],
    languages: [],
    status: false,
    loading: false,
    error: '',
    viewDrawingLoading: false,
  },
};

interface ISubmittalDrawing {
  userData: {
    formatID: string;
    location: string;
    language: string;
    customer: string;
    poNumber: string;
    title: string;
    assemblyNo: string;
    salesOrder: string;
    requestedBy: string;
    vin: string;
    projectName: string;
    serialNumber: string;
    tagNumber: string;
    notes: string;
  };
  tagData: {
    lastModified: string;
    setPressure: string;
    quantity: string;
    model: string;
    catalogString: string;
  };
  tagSummary: {
    customer: string;
    company: string;
    projectName: string;
    setPressure: string;
    model: string;
    catalogString: string;
  };
  error: {
    enterInfo: IEnterInfo;
  };
  loading: boolean;
  sizing_id: string;
  config_id: string;
}

interface IEnterInfo {
  customer: IErrorDetail[];
  poNumber: IErrorDetail[];
  title: IErrorDetail[];
  assemblyNo: IErrorDetail[];
  salesOrder: IErrorDetail[];
  requestedBy: IErrorDetail[];
  vin: IErrorDetail[];
  projectName: IErrorDetail[];
  serialNumber: IErrorDetail[];
  tagNumber: IErrorDetail[];
  notes: IErrorDetail[];
  sizing_id: IErrorDetail[];
  config_id: IErrorDetail[];
}

interface IErrorDetail {
  type: string;
  message: string;
}

interface IApiData {
  drawingUrl: string;
  cadFileUrl: string;
  views: string[];
  formatList: string[];
  locations: string[];
  languages: string[];
  status: boolean;
  loading: boolean;
  error: string;
  viewDrawingLoading: boolean;
}

interface IRootState {
  submittalDrawing: ISubmittalDrawing;
  apiData: IApiData;
}
