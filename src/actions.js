import axios from "axios";
import { toast } from "react-toastify";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";

export function notEkle(not) {
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  const ekleToaster = toast.loading("Notunuz Ekleniyor");
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        toast.update(ekleToaster, {
          render: "Eklendi",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        dispatch(notEkle(res.data.json));
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notEkle ile dispatch edin
      }
    })
    .catch((error) => console.log(error));
};

export const notSilAPI = (id) => (dispatch) => {
  const silToaster = toast.loading("Notunuz Siliniyor");
  // console.log(id);
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        toast.update(silToaster, {
          render: "Notunuz Silindi",
          type: "warning",
          isLoading: false,
          autoClose: 2500,
        });
        dispatch(notSil(res.data.data));
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin
      }
    })
    .catch((error) => console.log(error));
};
