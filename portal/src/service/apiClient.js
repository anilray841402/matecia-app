class ApiClient {
  constructor() {
    this.baseURL = "http://localhost:4000/api/v1";
    this.defaultHeaders = {
      Accept: "application/json",
    };
  }

  async customFetch(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...options.headers };

      const config = {
        ...options,
        headers,
        credentials: "include",
      };

      // console.log(`Fetching ${url}`);
      const response = await fetch(url, config);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("API Error", error);
      throw error;
    }
  }

  // Auth endpoints
  async signup(name, email, password) {
    return this.customFetch("/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async login(email, password) {
    return this.customFetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async verifyToken(token) {
    return this.customFetch("/users/verify-token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async fetchExhibitor() {
    return this.customFetch("/exhibitors/edit-exhibitor", {
      method: "GET",
    });
  }

  async submitBadges(name, designation, companyName, email, mobile) {
    return this.customFetch("/exhibitors/submit-badges", {
      method: "POST",
      body: JSON.stringify({ name, designation, companyName, email, mobile }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async fetchBadges() {
    return this.customFetch("/exhibitors/get-badges", {
      method: "GET",
    })
  }

  async deletedBadge(badgeId) {
    return this.customFetch(`/exhibitors/delete-badge/${badgeId}`, {
      method: "DELETE",
    })
  }

  async updateBadges(badgeId, name, designation, companyName, email, mobile) {
    return this.customFetch(`/exhibitors/update-badges/${badgeId}`, {
      method: "PUT",
      body: JSON.stringify({ name, designation, companyName, email, mobile }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async submitPaymentRecord(date, stallPayment, brandingPayment, powerPayment, tdsDeductions, refNumber, remarks) {
    return this.customFetch("/exhibitors/submit-payment-record", {
      method: "POST",
      body: JSON.stringify({ date, stallPayment, brandingPayment, powerPayment, tdsDeductions, refNumber, remarks }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async fetchPaymentRecord() {
    return this.customFetch("/exhibitors/get-payment-record", {
      method: "GET",
    })
  }

  async deletePaymentRecord(paymentRecordId) {
    return this.customFetch(`/exhibitors/delete-payment-record/${paymentRecordId}`, {
      method: "DELETE",
    })
  }

  async updatePaymentRecord(paymentRecordId, date, stallPayment, brandingPayment, powerPayment, tdsDeductions, refNumber, remarks) {
    return this.customFetch(`/exhibitors/update-payment-record/${paymentRecordId}`, {
      method: "PUT",
      body: JSON.stringify({ date, stallPayment, brandingPayment, powerPayment, tdsDeductions, refNumber, remarks }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async fetchPowerOrder() {
    return this.customFetch("/exhibitors/get-power-order", {
      method: "GET",
    })
  }

  async submitPowerOrder(setUpDays, showDays, total, status) {
    return this.customFetch("/exhibitors/submit-power-order", {
      method: "POST",
      body: JSON.stringify({ setUpDays, showDays, total, status }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async updatePowerOrder(powerOrderId, reopenId, setUpDays, showDays, total, status) {
    return this.customFetch(`/exhibitors/update-power-order/${powerOrderId}`, {
      method: "PUT",
      body: JSON.stringify({ setUpDays, showDays, total, reopenId, status }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async reopenPowerOrder(status, powerOrderId) {
    return this.customFetch(`/exhibitors/reopen-power-order/${powerOrderId}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async fetchBoothDesign() {
    return this.customFetch("/exhibitors/get-booth-design", {
      method: "GET",
    })
  }

  async submitBoothDesign(formData) {
    return this.customFetch("/exhibitors/submit-booth-design", {
      method: "POST",
      body: formData,
    });
  }

  async updateBoothDesign(formData, boothDesignId) {
    return this.customFetch(`/exhibitors/update-booth-design/${boothDesignId}`, {
      method: "PUT",
      body: formData,
    });
  }

  async reopenBoothDesign(reopenStatus, reopenId) {
    return this.customFetch(`/exhibitors/reopen-booth-design/${reopenId}`, {
      method: "PUT",
      body: JSON.stringify({ reopenStatus }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async submitMaterialAdda(formData) {
    return this.customFetch("/exhibitors/submit-material-adda", {
      method: "POST",
      body: formData,
    });
  }

  async fetchMaterialAdda() {
    return this.customFetch("/exhibitors/get-material-adda", {
      method: "GET",
    })
  }

  async updateMaterialAdda(productSubmissionId, formData) {
    return this.customFetch(`/exhibitors/update-material-adda/${productSubmissionId}`, {
      method: "PUT",
      body: formData,
    });
  }

  async reopenMaterialAdda(status, productSubmissionId) {
    return this.customFetch(`/exhibitors/reopen-material-adda/${productSubmissionId}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  async logOut() {
    return this.customFetch("/users/logout", {
      method: "GET",
    });
  }


  async fetchExhibitors() {
    return this.customFetch("/operation/get-exhibitors", {
      method: "GET",
    })
  }

  async updateExhibitor(formData, exhibitorId) {
    return this.customFetch(`/operation/update-exhibitor/${exhibitorId}`, {
      method: "PUT",
      body: formData,
    });
  }

  async emailExhibitor(exhibitorId) {
    return this.customFetch(`/operation/email-exhibitor/${exhibitorId}`, {
      method: "GET",
    });
  }

  async exhibitorLogin(exhibitorId) {
    return this.customFetch(`/operation/impersonate/${exhibitorId}`, {
      method: "GET",
    });
  }

  async handleSwitchBack() {
    return this.customFetch(`/operation/switch-back-admin`, {
      method: "GET",
    })
  }

  async fetchBoothDesignOperation() {
    return this.customFetch("/operation/get-booth-design", {
      method: "GET",
    })
  }

  async updateBoothDesignOperation(boothDesignId, status) {
    return this.customFetch(`/operation/update-booth-design/${boothDesignId}`, {
      method: "put",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      }
    })
  }

  async fetchPowerOrderOperation() {
    return this.customFetch("/operation/get-power-order", {
      method: "GET",
    })
  }

  async fetchProductSubmission() {
    return this.customFetch("/operation/get-product-submission", {
      method: "GET",
    })
  }

  async fetchReopenRequest() {
    return this.customFetch("/operation/get-reopen-request", {
      method: "GET",
    })
  }

  async updateReopenRequest(reopenId, status) {
    return this.customFetch(`/operation/update-reopen-request/${reopenId}`, {
      method: "put",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      }
    })
  }

  async submitExhibitor(formData) {
    return this.customFetch("/operation/add-exhibitor", {
      method: "POST",
      body: formData,
    })
  }

  async fetchAdditionalPowerOrder() {
    return this.customFetch("/account/get-additional-power-order", {
      method: "GET",
    })
  }

  async fetchPaymentRecordAccount() {
    return this.customFetch("/account/get-payment-record", {
      method: "GET",
    })
  }

  async submitVendor(formData) {
    // console.log('hi', [...formData.entries()]);
    // return
    return this.customFetch("/admin/add-vendor", {
      method: "POST",
      body: formData,
    })
  }

  async fetchVendors() {
    return this.customFetch("/admin/get-vendors", {
      method: "GET",
    })
  }

  async updateVendor(formData, vendorId) {
    return this.customFetch(`/admin/update-vendor/${vendorId}`, {
      method: "PUT",
      body: formData,
    });
  }

  async deleteVendor(vendorId) {
    return this.customFetch(`/admin/delete-vendor/${vendorId}`, {
      method: "DELETE",
    })
  }

  async fetchUsers() {
    return this.customFetch("/admin/get-users", {
      method: "GET",
    })
  }

  async updateUser(formData, userId) {
    return this.customFetch(`/admin/update-user/${userId}`, {
      method: "PUT",
      body: formData,
    });
  }

  async submitUser(formData) {
    return this.customFetch("/admin/add-user", {
      method: "POST",
      body: formData
    })
  }

  async deleteExhibitor(exhibitorId) {
    return this.customFetch(`/admin/delete-exhibitor/${exhibitorId}`, {
      method: "DELETE",
    })
  }


}

const apiClient = new ApiClient();

export default apiClient;
