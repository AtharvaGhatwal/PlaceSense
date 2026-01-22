import { useState, useEffect, useRef, useMemo } from "react";
import { moodConfig } from "./utils/moodConfig";
import { mockPlaces } from "./data/mockPlaces";

function App() {
  // refs
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const activeMarkerRef = useRef(null);
  const directionsRendererRef = useRef(null);
  
  // state
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState(mockPlaces);
  const [mood, setMood] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [miniMap, setMiniMap] = useState(false);

  useEffect(() => {
  const onScroll = () => {
    setMiniMap(window.scrollY > 300); // tweak 300 if needed
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  /* USER LOCATION */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setUserLocation({ lat: 28.6139, lng: 77.209 })
    );
  }, []);

  /* GOOGLE MAP + PLACES */
  useEffect(() => {
    if (!userLocation) return;

    const initMap = () => {
  const map = new window.google.maps.Map(mapRef.current, {
    center: userLocation,
    zoom: 14,
  });

  directionsRendererRef.current =
    new window.google.maps.DirectionsRenderer({
      map: map,
    });

  mapInstanceRef.current = map;


      mapInstanceRef.current = map;

      new window.google.maps.Marker({
  position: userLocation,
  map,
  title: "You are here",
  icon: {
    path: window.google.maps.SymbolPath.CIRCLE,
    scale: 10,
    fillColor: "#22d3ee",
    fillOpacity: 0.8,
    strokeColor: "#0ea5e9",
    strokeWeight: 6,
  },
});

      const config = moodConfig[mood] || { type: "restaurant" };

      // create the PlacesService bound to the map before calling nearbySearch
      const service = new window.google.maps.places.PlacesService(map);

service.nearbySearch(
  {
    location: userLocation,
    radius: 1500,
    type: config.type,
    keyword: config.keyword,
  },
  (results, status) => {
    if (
      status === window.google.maps.places.PlacesServiceStatus.OK
    ) {
      setNearbyPlaces(results);
    }
  }
);

    };
    if (window.google?.maps?.places) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);
  }, [userLocation, mood]);

  /* CLICK CARD → FOCUS MAP */
  const focusPlaceOnMap = (place) => {
    if (!mapInstanceRef.current || !place.geometry) return;

    const location = place.geometry.location;

    if (activeMarkerRef.current) {
      activeMarkerRef.current.setMap(null);
    }

    const marker = new window.google.maps.Marker({
      position: location,
      map: mapInstanceRef.current,
      title: place.name,
    });

    activeMarkerRef.current = marker;
    mapInstanceRef.current.panTo(location);
    mapInstanceRef.current.setZoom(16);
  };
    /* DRAW ROUTE */
const drawRouteToPlace = (place) => {
  if (
    !userLocation ||
    !place.geometry ||
    !directionsRendererRef.current
  )
    return;

  const directionsService =
    new window.google.maps.DirectionsService();

  directionsService.route(
    {
      origin: userLocation,
      destination: place.geometry.location,
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK") {
        directionsRendererRef.current.setDirections(result);
      }
    }
  );
};

/* CLEAR ROUTE */
const clearRoute = () => {
  if (directionsRendererRef.current) {
    directionsRendererRef.current.setDirections({ routes: [] });
  }
};

  /* OPEN GOOGLE MAPS */
  const openDirections = (place) => {
    if (!place.geometry || !userLocation) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, "_blank");
  };

  /* DISTANCE */
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  /* FILTER + SORT */
  const results = useMemo(() => {
    let res = [...nearbyPlaces];

    if (userLocation) {
      res = res.map((p) => ({
        ...p,
        distance: p.geometry
          ? +getDistance(
              userLocation.lat,
              userLocation.lng,
              p.geometry.location.lat(),
              p.geometry.location.lng()
            ).toFixed(2)
          : null,
      }));
    }

    if (search) {
      res = res.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "rating") {
      res.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    if (sortBy === "distance") {
      res.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return res;
  }, [nearbyPlaces, search, sortBy, userLocation]);

  /* PILL */
  const Pill = ({ label, active, onClick }) => (
    <button
      style={{
        ...styles.pill,
        background: active ? "#2563eb" : "rgba(255,255,255,0.08)",
        border: active
          ? "1px solid rgba(37,99,235,0.6)"
          : "1px solid rgba(255,255,255,0.12)",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
  return (
    <>
      <video className="bg-video" src="/bg.mp4" autoPlay loop muted />
      <div className="bg-overlay" />

      <div style={styles.glass}>
        <h1
  style={{
    fontSize: "clamp(36px, 6vw, 64px)",
    fontWeight: 800,
    letterSpacing: "0.5px",
    background:
      "linear-gradient(180deg, #ffffff 0%, #c7d2fe 40%, #93c5fd 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: `
      0 1px 2px rgba(255,255,255,0.25),
      0 8px 20px rgba(37,99,235,0.35),
      0 20px 40px rgba(0,0,0,0.6)
    `,
    marginBottom: 6,
  }}
>
  PlaceSense
</h1>
        <div style={styles.stickyMapWrapper}>
  <div
    ref={mapRef}
    style={styles.stickyMap}
  />
</div>

        <h1
  style={{
    fontSize: 56,
    fontWeight: 800,
    letterSpacing: "0.6px",
    background:
      "linear-gradient(180deg, #ffffff 0%, #c7d2fe 40%, #93c5fd 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: `
      0 2px 4px rgba(255,255,255,0.3),
      0 10px 25px rgba(37,99,235,0.4),
      0 25px 50px rgba(0,0,0,0.7)
    `,
    marginBottom: 8,
  }}
>
</h1>
        <h2 style={styles.section}>Select Mood</h2>   
        <p style={styles.subtitle}>
          Discover the perfect places around you based on your mood!
        </p>
        <div style={styles.row}>
          {["Work", "Date", "Quick Bite", "Budget"].map((m) => (
            <Pill
              key={m}
              label={m}
              active={mood === m}
              onClick={() => {
                setMood(m);
                setSearch("");
                setSortBy("");
              }}
            />
          ))}
        </div>

        <input
          style={styles.input}
          placeholder="Search places…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={styles.row}>
          <Pill
            label="⭐ Rating"
            active={sortBy === "rating"}
            onClick={() => setSortBy("rating")}
          />
          <Pill
            label="📍 Distance"
            active={sortBy === "distance"}
            onClick={() => setSortBy("distance")}
          />
        </div>

        <h2 style={styles.section}>Results</h2>

        {results.map((p, i) => (
  <div
    key={p.place_id}
    style={styles.card}
    onClick={() => focusPlaceOnMap(p)}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.boxShadow =
        "0 25px 60px rgba(0,0,0,0.6)";
      e.currentTarget.style.border =
        "1px solid rgba(37,99,235,0.5)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow =
        "0 10px 30px rgba(0,0,0,0.35)";
      e.currentTarget.style.border =
        "1px solid #1f2933";
    }}
  >

            <h3>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
  <button
  style={styles.actionPill}
    onClick={(e) => {
      e.stopPropagation();
      drawRouteToPlace(p);
    }}
  >
    🛣️ Route
  </button>

  <button
  style={styles.actionPill}
    onClick={(e) => {
      e.stopPropagation();
      openDirections(p);
    }}
  >
    🧭 Google Maps
  </button>
</div>

              #{i + 1} {p.name}
            </h3>
            <p>⭐ Rating: {p.rating || "N/A"}</p>
            <p>
              {p.opening_hours?.open_now ? "🟢 Open now" : "🔴 Closed"}
            </p>
            {p.distance && <p>📍 {p.distance} km</p>}
          </div>
        ))}
      </div>
    </>
  );
}

const styles = {
  glass: {
    maxWidth: 800,
    margin: "80px auto",
    padding: 32,
    borderRadius: 24,
    background: "rgba(15,23,42,0.75)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
    color: "#eaeaea",
  },
  title: { fontSize: 36 },
  subtitle: { color: "#9ca3af", marginBottom: 16 },
  section: { margin: "20px 0 10px" },
  row: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 },
  pill: {
    padding: "10px 18px",
    borderRadius: 999,
    fontSize: 14,
    color: "#eaeaea",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    background: "#0f172a",
    border: "1px solid #333",
    color: "#fff",
    marginBottom: 16,
  },
  card: {
  background: "#111827",
  padding: 20,
  borderRadius: 16,
  border: "1px solid #1f2933",
  marginBottom: 14,
  cursor: "pointer",

  /* animation defaults */
  transform: "translateY(0)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  transition:
    "transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",
  },
  stickyMapWrapper: {
  position: "sticky",
  top: 20,                
  zIndex: 10,
  marginBottom: 24,
},
stickyMap: {
  width: "100%",
  height: 320,
  borderRadius: 16,
  boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
  overflow: "hidden",
},

  actionPill: {
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 13,
    color: "#eaeaea",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  actionPillActive: {
    background: "#2563eb",
    border: "1px solid rgba(37,99,235,0.6)",
  },

};

export default App;
