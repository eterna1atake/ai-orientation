# Instruction: StudyPath AI - 8-Step Core Workflow Integration

จากการตรวจสอบระบบปัจจุบันที่อ้างอิงจาก `instruction.md` และโครงสร้างโฟลเดอร์ (Clean Architecture: Domain, Data, Presentation) พบว่าระบบปัจจุบันเน้นไปที่ **Skill Gap, Career Roadmap, และ Daily Planner** เป็นหลัก ซึ่งยังขาดฟังก์ชันที่เกี่ยวกับการ **ลงทะเบียนเรียนในมหาวิทยาลัย (University Academic Course Enrollment)** ตามรูปภาพ "StudyPath AI: 8-Step Core Workflow"

## 📌 สิ่งที่มีอยู่แล้ว (เทียบกับรูปภาพ)
- ✅ **Step 1: Create Your Academic Profile** (มี AI Assessment, Student Profile)
- ✅ **Step 2: Define Academic & Career Goals** (มี Career Timeline, Adaptive Roadmap)
- ❌ **Step 3: Get Intelligent Course Recommendations** (ยังไม่มี - ปัจจุบันมีแค่แนะนำ Resource ทั่วไป)
- ❌ **Step 4: Select Preferred Courses** (ยังไม่มี)
- ⚠️ **Step 5: Generate Optimized Schedule** (มี Weekly Calendar แต่ยังไม่มีฟังก์ชันจัดตารางเรียนแบบไม่มี Time Conflict)
- ❌ **Step 6: Analyze Workload & Risks** (ยังไม่มี - การประเมินความเสี่ยง Burnout และ Workload Score)
- ❌ **Step 7: Finalize & Lock Your Schedule** (ยังไม่มี)
- ⚠️ **Step 8: Continuous Progress Tracking** (มี Analytics แต่ยังไม่มีส่วนของ GPA, Earned Credits, และ Graduation Milestones)

---

## 🚀 คำแนะนำในการเพิ่มฟังก์ชัน (Implementation Instructions)

ด้านล่างนี้คือคำสั่งและแนวทางในการพัฒนาเพื่อเติมเต็ม Workflow ให้สมบูรณ์แบบตามภาพ โดยอิงกับโครงสร้าง Clean Architecture ที่มีอยู่

### 1. การอัปเดตระดับ Domain (Entities & Use Cases)
ให้สร้างหรืออัปเดตไฟล์ใน `domain/entities/` และ `domain/usecases/`

- **New Entity: `Course.ts`**
  - กำหนด Interface สำหรับรายวิชา (เช่น `id`, `code`, `name`, `credits`, `prerequisites`, `instructorRating`, `difficultyScore`, `schedules` (วัน/เวลา))
- **New Entity: `Workload.ts`**
  - กำหนด Interface สำหรับการวิเคราะห์ Workload (เช่น `score` (Light, Moderate, Heavy), `burnoutRisk`, `warnings`)
- **Update Entity: `Student.ts` / `Analytics.ts`**
  - เพิ่มฟิลด์ `currentGPA`, `targetGPA`, `earnedCredits`, `totalCreditsRequired`, `graduationMilestones`
- **New Use Cases (`CourseUsecases.ts`)**
  - `getRecommendedCourses()`: ดึงข้อมูลรายวิชาที่เหมาะสมตามเป้าหมายและความยาก
  - `generateOptimizedSchedule(selectedCourses)`: จัดตารางเรียนอัตโนมัติไม่ให้เวลาชนกัน (Zero Time Conflicts)
  - `analyzeWorkload(schedule)`: คำนวณ Workload Score และความเสี่ยง

### 2. การอัปเดตระดับ Data (Mocks & Repositories)
ให้อัปเดตไฟล์ใน `data/mocks/mockDataStore.ts` และเพิ่ม Repositories

- **`mockDataStore.ts`**:
  - เพิ่ม Mock Data สำหรับรายวิชาของมหาวิทยาลัย (มี Rating อาจารย์, ระดับความยาก)
  - จำลองข้อมูลโครงสร้างหลักสูตร (Degree Requirements) ตาม Pillar 1 (Institutional API Integrations) ในรูป
- **New Repository: `CourseRepository.ts`**
  - รับผิดชอบในการดึงข้อมูลรายวิชาและการแนะนำ
- **Update Repository: `AnalyticsRepository.ts`**
  - เพิ่ม Mock ข้อมูล GPA และ Credits

### 3. การอัปเดตระดับ Presentation (Components & UI)
สร้าง UI Components ใหม่ใน `presentation/components/` ให้สอดคล้องกับขั้นตอนต่างๆ

- **Step 3 & 4: Course Selection Module**
  - สร้าง `CourseRecommendationList.tsx`: แสดงรายการวิชาพร้อม "Suitability Ranking" (ความเหมาะสม), "Instructor Ratings", และ "Difficulty"
  - สร้าง `CourseSelectionCart.tsx`: ให้ผู้ใช้เลือกวิชา (Select Preferred Courses)
- **Step 5 & 7: Schedule Generation & Lock Module**
  - สร้าง `OptimizedScheduleView.tsx`: แสดงตารางเรียนที่ AI จัดให้ (พร้อมระบุว่า "0 Time Conflicts")
  - สร้างปุ่ม **"Finalize & Lock Schedule"** เพื่อบันทึกตารางเรียนที่ยืนยันแล้ว
- **Step 6: Workload Analysis Module**
  - สร้าง `WorkloadMeterWidget.tsx`: แสดงเข็มทิศหน้าปัดประเมิน Workload (Light, Moderate, Heavy) พร้อมคำแนะนำเพื่อลดความเสี่ยง Burnout
- **Step 8 (Update): Progress Tracking Dashboard**
  - อัปเดต `AnalyticsSnapshotWidget.tsx` หรือสร้าง `AcademicProgressWidget.tsx` เพื่อแสดงกราฟวงกลม/หลอดความคืบหน้าของ:
    - Current GPA vs Target GPA
    - Earned Credits vs Required Credits
    - Graduation Milestones

### 4. การจัดการ Routing (Pages)
- เพิ่ม/ปรับปรุงหน้า Page ใน App Router (`app/`):
  - `app/course-selection/page.tsx`: สำหรับครอบคลุม Step 3 และ 4
  - `app/schedule-builder/page.tsx`: สำหรับครอบคลุม Step 5, 6, และ 7
  - `app/analytics/page.tsx`: อัปเดตให้แสดงข้อมูล GPA และหน่วยกิตตาม Step 8

---

## 🎯 สรุปสิ่งที่ AI ต้องทำต่อไป (Next Steps)
หากคุณต้องการให้เริ่มลงมือเขียนโค้ด ให้คุณสั่งงานย่อยได้เลย เช่น:
1. *"ช่วยอัปเดต `domain/entities/` และ Mock Data ให้รองรับข้อมูลรายวิชาเรียน (Course) และ GPA หน่อย"*
2. *"ช่วยสร้าง Component สำหรับหน้า Course Selection (Step 3 & 4) ให้หน่อย"*
3. *"ช่วยสร้าง Widget สำหรับประเมิน Workload (Step 6) แบบมีเข็มทิศสถานะ Light/Moderate/Heavy ให้ที"*
