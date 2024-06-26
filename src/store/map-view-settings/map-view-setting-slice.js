import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  mapViewScales: [],
  error: "",
};

export const fetchmapViewScales = createAsyncThunk(
  "mapViewScale/fetchmapViewScales",
  async () => {
    //  console.log("yy-mapvisibilityscales-loading")
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/mapvisibilityscales`,
      {
        cache: "no-store",
      }
    );
    const d = await res.json();
    //  console.log("mapViewScales1", d.data);
    return d.data;

    // return axios
    //   .get("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => response.data);
  }
);

const mapViewScaleSlice = createSlice({
  name: "mapViewScale",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchmapViewScales.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchmapViewScales.fulfilled, (state, action) => {
      state.loading = false;
      state.mapViewScales = action.payload;
      state.error = "";
    });
    builder.addCase(fetchmapViewScales.rejected, (state, action) => {
      state.loading = false;
      state.mapViewScales = [];
      state.error = action.error.message;
    });
  },
});

export default mapViewScaleSlice.reducer;
