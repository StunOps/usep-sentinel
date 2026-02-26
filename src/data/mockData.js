// ===== Cheating Logs =====
export const cheatingLogs = [
    {
        id: 1,
        time: "10:23 AM",
        seat: "08",
        type: "Phone Usage",
        camera: "Camera 2",
        confidence: 94,
        timestamp: "2026-02-26T10:23:00",
    },
    {
        id: 2,
        time: "10:19 AM",
        seat: "12",
        type: "Head Turning",
        camera: "Camera 1",
        confidence: 91,
        timestamp: "2026-02-26T10:19:00",
    },
    {
        id: 3,
        time: "10:05 AM",
        seat: "05",
        type: "Passing Notes",
        camera: "Camera 2",
        confidence: 87,
        timestamp: "2026-02-26T10:05:00",
    },
    {
        id: 4,
        time: "9:52 AM",
        seat: "18",
        type: "Looking at Neighbor",
        camera: "Camera 1",
        confidence: 89,
        timestamp: "2026-02-26T09:52:00",
    },
    {
        id: 5,
        time: "9:41 AM",
        seat: "22",
        type: "Phone Usage",
        camera: "Camera 2",
        confidence: 96,
        timestamp: "2026-02-26T09:41:00",
    },
    {
        id: 6,
        time: "9:30 AM",
        seat: "03",
        type: "Head Turning",
        camera: "Camera 1",
        confidence: 82,
        timestamp: "2026-02-26T09:30:00",
    },
    {
        id: 7,
        time: "9:15 AM",
        seat: "27",
        type: "Whispering",
        camera: "Camera 2",
        confidence: 78,
        timestamp: "2026-02-26T09:15:00",
    },
];

// ===== Seat Map Data =====
export const seatData = Array.from({ length: 30 }, (_, i) => {
    const seatNum = i + 1;
    const padded = String(seatNum).padStart(2, "0");

    // Some seats are flagged
    const flaggedSeats = {
        8: { status: "red", incidents: 2, mostCommon: "Phone Usage" },
        12: { status: "red", incidents: 3, mostCommon: "Head Turning" },
        5: { status: "yellow", incidents: 1, mostCommon: "Passing Notes" },
        18: { status: "yellow", incidents: 1, mostCommon: "Looking at Neighbor" },
        22: { status: "red", incidents: 2, mostCommon: "Phone Usage" },
        3: { status: "yellow", incidents: 1, mostCommon: "Head Turning" },
        27: { status: "yellow", incidents: 1, mostCommon: "Whispering" },
    };

    const seatInfo = flaggedSeats[seatNum] || {
        status: "green",
        incidents: 0,
        mostCommon: "None",
    };

    return {
        id: seatNum,
        label: padded,
        ...seatInfo,
    };
});

// ===== Dashboard Stats =====
export const dashboardStats = [
    {
        label: "Total Incidents Today",
        value: 7,
        icon: "AlertTriangle",
        gradient: "gradient-red",
    },
    {
        label: "Most Common Type",
        value: "Head Turning",
        icon: "Eye",
        gradient: "gradient-yellow",
    },
    {
        label: "Most Flagged Seat",
        value: "Seat 12",
        icon: "Armchair",
        gradient: "gradient-purple",
    },
    {
        label: "Detection Accuracy",
        value: "94%",
        icon: "Target",
        gradient: "gradient-green",
    },
];

// ===== Chart Data =====
export const cheatingTypesChartData = {
    labels: [
        "Phone Usage",
        "Head Turning",
        "Passing Notes",
        "Looking at Neighbor",
        "Whispering",
    ],
    datasets: [
        {
            label: "Incidents",
            data: [3, 4, 1, 2, 1],
            backgroundColor: [
                "rgba(239, 68, 68, 0.7)",
                "rgba(234, 179, 8, 0.7)",
                "rgba(59, 130, 246, 0.7)",
                "rgba(139, 92, 246, 0.7)",
                "rgba(6, 182, 212, 0.7)",
            ],
            borderColor: [
                "#ef4444",
                "#eab308",
                "#3b82f6",
                "#8b5cf6",
                "#06b6d4",
            ],
            borderWidth: 2,
            borderRadius: 8,
        },
    ],
};

export const incidentsPerHourChartData = {
    labels: [
        "8 AM",
        "9 AM",
        "10 AM",
        "11 AM",
        "12 PM",
        "1 PM",
        "2 PM",
        "3 PM",
    ],
    datasets: [
        {
            label: "Incidents",
            data: [0, 3, 3, 1, 0, 2, 1, 0],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#3b82f6",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
        },
    ],
};

// ===== Chart Options =====
export const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: "#111827",
            borderColor: "#3b82f6",
            borderWidth: 1,
            titleColor: "#f1f5f9",
            bodyColor: "#94a3b8",
            cornerRadius: 8,
        },
    },
    scales: {
        x: {
            ticks: { color: "#94a3b8", font: { size: 11 } },
            grid: { color: "rgba(30, 41, 59, 0.5)" },
        },
        y: {
            ticks: { color: "#94a3b8", stepSize: 1 },
            grid: { color: "rgba(30, 41, 59, 0.5)" },
        },
    },
};

export const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: "#111827",
            borderColor: "#3b82f6",
            borderWidth: 1,
            titleColor: "#f1f5f9",
            bodyColor: "#94a3b8",
            cornerRadius: 8,
        },
    },
    scales: {
        x: {
            ticks: { color: "#94a3b8", font: { size: 11 } },
            grid: { color: "rgba(30, 41, 59, 0.5)" },
        },
        y: {
            ticks: { color: "#94a3b8", stepSize: 1 },
            grid: { color: "rgba(30, 41, 59, 0.5)" },
        },
    },
};

// ===== System Info =====
export const systemInfo = {
    version: "v1.0 (Mock)",
    cameras: [
        { name: "Camera 1 — Front View", status: "Online" },
        { name: "Camera 2 — Rear View", status: "Online" },
    ],
    storageUsed: "12%",
    aiModel: "Simulated",
    uptime: "4h 23m",
    lastSync: "10:24 AM",
    detectionMode: "Passive Monitoring",
    frameRate: "30 FPS",
};

// ===== Simulate Cheating Options =====
export const cheatingTypes = [
    "Phone Usage",
    "Head Turning",
    "Passing Notes",
    "Looking at Neighbor",
    "Whispering",
    "Using Hidden Notes",
];
