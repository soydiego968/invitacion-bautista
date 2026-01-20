const btnGps = document.getElementById("btnGps");
const autoF1 = document.querySelector(".f1-car");
const motorF1 = document.getElementById("motorF1");

// 📍 Coordenadas del salón
const destinoLat = -34.603722;
const destinoLon = -58.381592;

// ⏱ Duración de la animación (igual que CSS)
const TIEMPO_ARRANQUE = 1500;

btnGps.addEventListener("click", iniciarNavegacion);

function iniciarNavegacion() {
    if (!navigator.geolocation) {
        alert("🚫 Tu dispositivo no soporta GPS");
        return;
    }

    // 🔒 Bloquear botón
    btnGps.disabled = true;
    btnGps.textContent = "🏁 ARRANCANDO MOTOR...";

    // 🔊 Sonido motor F1
    motorF1.currentTime = 0;
    motorF1.volume = 0.6;
    motorF1.play();

    // 🏎️ Reiniciar animación
    autoF1.classList.remove("arrancar");
    void autoF1.offsetWidth;
    autoF1.classList.add("arrancar");

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            // ⏳ Esperar animación
            setTimeout(() => {
                detenerMotor();

                const url = `https://www.google.com/maps/dir/${lat},${lon}/${destinoLat},${destinoLon}`;
                window.open(url, "_blank");

                resetearBoton();
            }, TIEMPO_ARRANQUE);
        },
        () => {
            detenerMotor();
            alert("📡 No se pudo obtener tu ubicación");
            resetearBoton();
        }
    );
}

function detenerMotor() {
    motorF1.pause();
    motorF1.currentTime = 0;
}

function resetearBoton() {
    btnGps.disabled = false;
    btnGps.textContent = "🏎️ INICIAR NAVEGACIÓN";
}





