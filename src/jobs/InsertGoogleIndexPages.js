class JobInsertGoogleIndexPages {
  constructor() {
    this.key = 'JobInsertGoogleIndexPages';
    this.options = {
      attemps: 2,
    };
  }

  async handle(values) {

    try {

      const { uuid, domains } = values.data;
      
    } catch (error) {
      
    }
  }
}

export default new JobInsertGoogleIndexPages();
