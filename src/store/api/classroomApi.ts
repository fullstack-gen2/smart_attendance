import { baseApi } from "./baseApi";
import type {
  ApiResponse,
  ClassroomResponse,
  PageResponse,
  StudentResponse,
} from "@/lib/type/apiTypes";

export const classroomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassrooms: builder.query<
      ApiResponse<PageResponse<ClassroomResponse>>,
      { page?: number; size?: number }
    >({
      query: ({ page = 0, size = 50 } = {}) =>
        `/classrooms?page=${page}&size=${size}`,
      providesTags: ["Classroom"],
    }),

    getClassroom: builder.query<ApiResponse<ClassroomResponse>, number>({
      query: (id) => `/classrooms/${id}`,
      providesTags: ["Classroom"],
    }),

    getClassroomStudents: builder.query<
      ApiResponse<PageResponse<StudentResponse>>,
      { classroomId: number; page?: number; size?: number }
    >({
      query: ({ classroomId, page = 0, size = 100 }) =>
        `/classrooms/${classroomId}/students?page=${page}&size=${size}`,
      providesTags: ["Student"],
    }),
  }),
});

export const {
  useGetClassroomsQuery,
  useGetClassroomQuery,
  useGetClassroomStudentsQuery,
} = classroomApi;
