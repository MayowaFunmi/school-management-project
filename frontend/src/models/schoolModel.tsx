export interface TermDto {
  termName: string
  termStarts: string
  termEnds: string
}

export interface SchoolTermDto {
  schoolSessionId: string
  schoolTerms: TermDto[]
}

export interface SessionDto {
  name: string
  sessionStarts: string
  sessionEnds: string
}