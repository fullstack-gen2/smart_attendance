import { baseApi } from "./baseApi";
import type {
  ApiResponse,
  PageResponse,
  ScheduleResponse,
} from "@/lib/type/apiTypes";

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchedules: builder.query<
      ApiResponse<PageResponse<ScheduleResponse>>,
      { page?: number; size?: number }
    >({
      query: ({ page = 0, size = 50 } = {}) =>
        `/schedules?page=${page}&size=${size}`,
    }),

    getSchedulesByClassroom: builder.query<
      ApiResponse<PageResponse<ScheduleResponse>>,
      { classroomId: number; page?: number; size?: number }
    >({
      query: ({ classroomId, page = 0, size = 50 }) =>
        `/schedules/classrooms/${classroomId}?page=${page}&size=${size}`,
    }),
  }),
});

export const { useGetSchedulesQuery, useGetSchedulesByClassroomQuery } =
  scheduleApi;
