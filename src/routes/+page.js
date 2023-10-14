import axios from "axios";

export const load = async () => {
  try {
    const reservations = await axios.get('http://localhost:3001/reservation');
    return {
      reservations: {
        reservations: reservations.data
      }
    };
  } catch (error) {
    console.error("예약 정보를 가져오는 중 오류가 발생했습니다:", error);
    return {
      status: 500,
      error: new Error("예약 정보를 가져오는 중 오류가 발생했습니다")
    };
  }
};
