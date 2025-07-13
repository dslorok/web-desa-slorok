// Layanan Page JavaScript (dengan fungsionalitas modal)

let allServices = []; // Variabel global untuk menyimpan data semua layanan

function hideLoading() {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    loadingElement.classList.add("hidden");
  }
}

async function loadJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function showNotification(message, type) {
  const notificationElement = document.getElementById("notification");
  if (notificationElement) {
    notificationElement.textContent = message;
    notificationElement.className = `bg-${type}-100 text-${type}-800 p-4 rounded-lg shadow-lg`;
    notificationElement.classList.remove("hidden");

    setTimeout(() => {
      notificationElement.classList.add("hidden");
    }, 3000);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadServicesContent();
    initializeServiceForm();
    hideLoading();
  } catch (error) {
    console.error("Error loading services content:", error);
    hideLoading();
  }
});

async function loadServicesContent() {
  try {
    const servicesData = await loadJSON("data/services.json");
    if (servicesData) {
      allServices = servicesData.services; // Simpan data layanan secara global
      populateServicesInfo(allServices);
      populateServiceTypes(servicesData.serviceTypes);
    }
  } catch (error) {
    console.error("Error loading services content:", error);
  }
}

function populateServicesInfo(services) {
  const container = document.getElementById("servicesInfo");
  if (!container || !services) return;

  container.innerHTML = "";
  services.forEach((service) => {
    const serviceElement = document.createElement("div");

    // Mengubah kelas untuk layout flexbox, tidak lagi text-center
    serviceElement.className =
      "bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center space-x-6";

    // Mengubah struktur HTML internal untuk layout logo di kiri
    serviceElement.innerHTML = `
      <div class="flex-shrink-0">
        <i class="${service.icon} text-4xl text-primary-600 dark:text-primary-400"></i>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">${service.title}</h3>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">${service.description}</p>
      </div>
    `;

    // Tambahkan event listener untuk memanggil fungsi showServiceDetail
    serviceElement.addEventListener("click", () => {
      showServiceDetail(service.id);
    });

    container.appendChild(serviceElement);
  });
}

function showServiceDetail(serviceId) {
  const service = allServices.find((s) => s.id === serviceId);
  if (!service) return;

  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";

  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6 md:p-8">
        
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white pr-4">${service.title}</h2>
          <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl flex-shrink-0">×</button>
        </div>
        
        <div class="prose dark:prose-invert max-w-none">
          ${service.flowContent}
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}