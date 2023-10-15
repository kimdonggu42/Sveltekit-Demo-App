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

  const deleteReservation = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:3001/reservation/${reservationId}`);
      await loadReservations();
    } catch (error) {
      console.error("예약 삭제 중 오류가 발생했습니다:", error);
    }
  };



  return {
    subscribe,
    deleteReservation
  };
};

export const reservationsStore = createReservationsStore();
