import { writable } from "svelte/store";
import axios from "axios";

const createReservationsStore = () => {
  const { subscribe, set } = writable([]);

  const loadReservations = async () => {
    try {
      const res = await axios.get('http://localhost:3001/reservation');
      set(res.data);
    } catch (error) {
      console.error("예약 정보를 가져오는 중 오류가 발생했습니다.", error);
    }
  };
  loadReservations();

  const postReservation = async (newReservationData) => {
    try {
      await axios.post('http://localhost:3001/reservation', newReservationData);
      await loadReservations();
    } catch (error) {
      console.error("예약 추가 중 오류가 발생했습니다.", error);
    }
  };

  const editReservation = async (reservationId, editReservation) => {
    try {
      await axios.patch(`http://localhost:3001/reservation/${reservationId}`, editReservation);
      await loadReservations();
    } catch (error) {
      console.error("예약 수정 중 오류가 발생했습니다.", error);
    }
  };

  const seatedReservation = async (reservationId, updateSeated) => {
    try {
      await axios.patch(`http://localhost:3001/reservation/${reservationId}`, updateSeated);
      await loadReservations();
    } catch (error) {
      console.error("예약 중 오류가 발생했습니다.", error);
    }
  };

  const deleteReservation = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:3001/reservation/${reservationId}`);
      await loadReservations();
    } catch (error) {
      console.error("예약 삭제 중 오류가 발생했습니다.", error);
    }
  };

  return {
    subscribe,
    postReservation,
    editReservation,
    seatedReservation,
    deleteReservation
  };
};

export const reservationsStore = createReservationsStore();