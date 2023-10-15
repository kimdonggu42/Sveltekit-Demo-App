import { writable } from "svelte/store";
import axios from "axios";

const createReservationsStore = () => {
  const { subscribe, set } = writable([]);

  const loadReservations = async () => {
    try {
      const res = await axios.get('http://localhost:3001/reservation');
      const reservationsData = res.data;
      set(reservationsData);
    } catch (error) {
      console.error("예약 정보를 가져오는 중 오류가 발생했습니다:", error);
    }
  };
  loadReservations();

  return {
    subscribe
  };
};

export const reservationsStore = createReservationsStore();
