module.exports = {
    age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month <0 ||
            month ==0 &&
            today.getDate() <= birthDate.getDate()) {
                age = age - 1
            }

        return age
    },
    date(timestamp){
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

    return {
        day,
        month,
        year,
        iso: `${year}-${month}-${day}`,
        bDay: `${day}/${month}`,
        format: `${day}/${month}/${year}`
    }
    },
    grade(grade){
        switch (grade){
            case "3EM":    
                grade = "3º ano do ensino médio"
                break
            case "2EM": 
                grade = "2º ano do ensino médio"
                break
            case "1EM": 
                grade = "1º ano do ensino médio"
                break
            case "8EF": 
                grade = "8º ano do ensino fundamental"
                break
            case "7EF": 
                grade = "7º ano do ensino fundamental"
                break
            case "6EF": 
                grade = "6º ano do ensino fundamental"
                break
            case "5EF": 
                grade = "5º ano do ensino fundamental"
                break
        }
    
        return grade 
    },
    adjustGrade(students, { grade }){
        let i = 0
        let studentShow = []
        for (let student of students){
        
            studentShow[i] = {

                ...student,
                school_grade: grade(student.school_grade)
            }
            i++      
        }
        return studentShow
    },
    graduation(graduation){
        switch (graduation){
            case "Medio":    
                graduation = "Ensino Médio Completo"
                break
            case "Superior": 
                graduation = "Ensino Superior Completo"
                break
        }

    return graduation
    },
    separateSubjects(teachers){
        let i = 0
        let teacherShow = []
        for (let teacher of teachers){
        
            teacherShow[i] = {

                ...teacher,
                subjects: teacher.subjects.split(",")
            }
            i++      
        }
        return teacherShow
    }

}