import ProfessorsPage from "@/components/ui/professor-management/admin-professors-page";
import { Search } from "@/components/ui/search";
import { fetchProfessorsList } from "@/lib/actions";
import { IPageRequest } from "@/lib/core/pagination";

export default async function ProfessorsPageWrapper({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  let currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const limit = 8;

  const listParameters: IPageRequest = {
    search: query,
    offset: (currentPage - 1) * limit,
    limit: limit,
  };

  const paginatedProfessors = await fetchProfessorsList(listParameters);

  return (
    <>
      <ProfessorsPage
        professors={paginatedProfessors.items}
        paginationOptions={paginatedProfessors.pagination}
        page={currentPage}
        query={query}
      />
    </>
  );
}
