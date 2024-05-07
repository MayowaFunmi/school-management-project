import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ClassValues, IClass, ResultQuery, SchoolDept, ScoreData } from "../models/studentModel";
import axios from "axios";
import { baseUrl, getAxiosConfig } from "../config/Config";
import { GetClassStudents } from "../models/userModel";

const initialState: IClass = {
	classArms: [],
	classMsg: "",
	addClass: {
		classArmId: "",
		name: "",
		schoolId: "",
		studentClassId: "",
		departmentId: ""
	},
	addClassMsg: "",
	addDeptMsg: "",
	msg: "",
	getStdentClass: [],
	getStdentClassMsg: "",
	studentCurrentPage: 0,
	studentTotalPages: 0,
	getAllStdentClass: [],
	getAllStdentClassMsg: "",
	scoreData: {
		classId: "",
		subjectId: "",
		term: "",
		studentsScores: [],
		sessionId: ""
	},
	scoreMsg: "",
	resultData: [],
	resultMsg: ""
}

// copy in student slice
export const getSchoolClass = createAsyncThunk(
	'studentclass/getSchoolClass',
	async (schoolId: string, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/school/get-school-class-list/${schoolId}`, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const addSchoolClass = createAsyncThunk(
	'studentclass/addSchoolClass',
	async (classData: ClassValues, thunkApi) => {
		try {
			const { schoolId, name, arm } = classData;
			const response = await axios.post(`${baseUrl}/api/admin/add-student-class/${schoolId}`, {name, arm}, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const addSchoolDepartment = createAsyncThunk(
	'studentclass/addSchoolDepartment',
	async (deptData: SchoolDept, thunkApi) => {
		try {
			const { schoolId, name } = deptData;
			const response = await axios.post(`${baseUrl}/api/admin/add-school-department/${schoolId}`, {name}, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const addStudentsCATests = createAsyncThunk(
	'studentclass/addStudentsCATests',
	async (scoreData: ScoreData, thunkApi) => {
		try {
			const response = await axios.post(`${baseUrl}/api/student/add-students-scores`, {scoreData}, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const studentsInClassArm = createAsyncThunk(
	'studentclass/studentsInClassArm',
	async (classData: GetClassStudents
		, thunkApi) => {
		try {
			const { studentClassId, page, pageSize } = classData
			const response = await axios.get(`${baseUrl}/api/student/get-students-in-class-arm/${studentClassId}`, {
				params: { page, pageSize },
				...getAxiosConfig()
			})
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const allStudentsInClassArm = createAsyncThunk(
	'studentclass/allStudentsInClassArm',
	async (classId: string, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/student/get-students-in-class/${classId}`, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const getStudentResults = createAsyncThunk(
	'studentclass/getStudentResults',
	async (query: ResultQuery, thunkApi) => {
		try {
			const response = await axios.get(`${baseUrl}/api/student/"get-students-result"/${query}`, getAxiosConfig())
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

const studentclassSlice = createSlice({
	name: "studentclass",
	initialState,
	reducers: {
		clearClassData: (state) => {
			state.classArms = []
			state.classMsg = ""
		},
		resetAddClass: (state) => {
			state.addClass = {
				classArmId: "",
				name: "",
				schoolId: "",
				studentClassId: "",
				departmentId: ""
			};
			state.addClassMsg = ""
		},

		clearClassCATests: (state) => {
			state.scoreData = {
				classId: "",
				subjectId: "",
				term: "",
				studentsScores: [],
				sessionId: ""
			};
			state.scoreMsg = ""
		},
		resetAddDept: (state) => {
			state.addDeptMsg = ""
		},
		resetClassArm: (state) => {
			state.getStdentClass = []
			state.getAllStdentClass = []
			state.getStdentClassMsg = ""
			state.getAllStdentClassMsg = ""
			state.studentCurrentPage = 0
			state.studentTotalPages = 0
		},
		clearResults: (state) => {
			state.resultData = []
			state.resultMsg = ""
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSchoolClass.pending, (state) => {
				return { ...state, classMsg: "pending" }
			})

			.addCase(getSchoolClass.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const classData = action.payload
					state.classArms = classData.data
					state.classMsg = "success"
				}
			})
			.addCase(getSchoolClass.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const classData = action.payload
					state.classArms = classData.data
					state.classMsg = "rejected"
				}
			})

		builder
			.addCase(addSchoolClass.pending, (state) => {
				return { ...state, addClassMsg: "pending" }
			})

			.addCase(addSchoolClass.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const classData = action.payload
					state.addClass = classData.data
					state.addClassMsg = "success"
				}
			})
			.addCase(addSchoolClass.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const classData = action.payload
					state.addClass = classData.data
					state.addClassMsg = "rejected"
				}
			})

		builder
			.addCase(addSchoolDepartment.pending, (state) => {
				return { ...state, addDeptMsg: "pending" }
			})

			.addCase(addSchoolDepartment.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					state.addDeptMsg = "success"
					state.msg = action.payload.message
				}
			})
			.addCase(addSchoolDepartment.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload.status === "badRequest") {
					state.addDeptMsg = "rejected"
					state.msg = action.payload.message
				}
			})

		builder
			.addCase(studentsInClassArm.pending, (state) => {
				return { ...state, getStdentClassMsg: "pending" }
			})

			.addCase(studentsInClassArm.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const classData = action.payload.data
					state.getStdentClassMsg = "success"
					state.getStdentClass = classData.students
					if (classData !== null) {
						state.studentCurrentPage = classData.currentPage;
						state.studentTotalPages = classData.totalPages;
					}
				}
			})
			.addCase(studentsInClassArm.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					state.getStdentClassMsg = "rejected"
				}
			})

		builder
			.addCase(allStudentsInClassArm.pending, (state) => {
				return { ...state, getAllStdentClassMsg: "pending" }
			})

			.addCase(allStudentsInClassArm.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const classData = action.payload.data
					state.getAllStdentClassMsg = "success"
					state.getAllStdentClass = classData
				}
			})
			.addCase(allStudentsInClassArm.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					state.getAllStdentClassMsg = "rejected"
				}
			})

		builder
			.addCase(addStudentsCATests.pending, (state) => {
				return { ...state, scoreMsg: "pending" }
			})

			.addCase(addStudentsCATests.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const classData = action.payload
					state.scoreData = classData.data
					state.scoreMsg = "success"
				}
			})
			.addCase(addStudentsCATests.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const classData = action.payload
					state.scoreData = classData.data
					state.scoreMsg = "rejected"
				}
			})

		builder
			.addCase(getStudentResults.pending, (state) => {
				return { ...state, resultMsg: "pending" }
			})

			.addCase(getStudentResults.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const classData = action.payload
					state.resultData = classData.data
					state.resultMsg = "success"
				}
			})
			.addCase(getStudentResults.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const classData = action.payload
					state.resultData = classData.data
					state.resultMsg = "rejected"
				}
			})
	}
})

export const { clearClassData, resetAddClass, resetAddDept, resetClassArm, clearClassCATests, clearResults } = studentclassSlice.actions;
export default studentclassSlice.reducer;