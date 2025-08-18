import React, { useRef,useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import { API_ENDPOINTS } from '../api/apiConfig';
import { FaPen, FaTrash } from "react-icons/fa";
import { toast } from 'react-hot-toast';


interface Hole {
  holeNumber: number;
  par: number;
}

interface Template {
  id?: string;
  name: string;
  address: string;
  prefecture: string,
  holes: Hole[];
}

const initialHoles: Hole[] = Array.from({ length: 18 }, (_, i) => ({
  holeNumber: i + 1,
  par: 4,
}));

const CourseTemplatePage: React.FC = () => {
  const [template, setTemplate] = useState<Template>({
    name: '',
    address: '',
    prefecture: '',
    holes: initialHoles,
  });

  const [templates, setTemplates] = useState<Template[]>([]);
 // const [editingId, setEditingId] = useState<string | null>(null);


 const [editingId, setEditingId] = useState(null);
const [editForm, setEditForm] = useState({
  name: '',
  address: '',
  prefecture: '',
  holes: Array(18).fill({ par: '', holeNumber: '' }),
});



  const formRef = useRef<HTMLDivElement | null>(null);

  const prefectures = [
  "Hokkaido", "Aomori", "Iwate", "Miyagi", "Akita", "Yamagata", "Fukushima",
  "Ibaraki", "Tochigi", "Gunma", "Saitama", "Chiba", "Tokyo", "Kanagawa",
  "Niigata", "Toyama", "Ishikawa", "Fukui", "Yamanashi", "Nagano", "Gifu",
  "Shizuoka", "Aichi", "Mie", "Shiga", "Kyoto", "Osaka", "Hyogo", "Nara", "Wakayama",
  "Tottori", "Shimane", "Okayama", "Hiroshima", "Yamaguchi", "Tokushima", "Kagawa",
  "Ehime", "Kochi", "Fukuoka", "Saga", "Nagasaki", "Kumamoto", "Oita", "Miyazaki",
  "Kagoshima", "Okinawa"
];

   const token = localStorage.getItem("admin_token");

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const res = await axios.get(API_ENDPOINTS.GETTEMPLATES,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Templates fetched:", res.data);
    setTemplates(res.data.courseEvents || []);
  };



  const handleParChange = (index: number, value: number) => {
    const newHoles = [...template.holes];
    newHoles[index].par = value;
    setTemplate({ ...template, holes: newHoles });
  };

  const handleSave = async () => {
   /* if (editingId) {
      await axios.put(`${API_ENDPOINTS.UPDATETEMPLATE}/${editingId}`, template,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
     });
    } else {*/
      if (!template.name || !template.address || !template.prefecture) {
  toast.error("Please enter template name, address and prefecture.");
  return;
}
      await axios.post(API_ENDPOINTS.CREATETEMPLATE, template,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
     });
    //}
   // toast.success(editingId ? "Template updated!" : "Template created!");
   toast.success("Template created!");
    setTemplate({ name: '', address: '',prefecture:'', holes: initialHoles });
    //setEditingId(null);
    fetchTemplates();
  };

  /*const handleEdit = (template: Template) => {
    setTemplate(template);
    setEditingId(template.id || null);
  };*/

 /* const handleEdit = (template: Template) => {
  setTemplate(template); // populate form fields
  setEditingId(template.id || null); // if you track edit mode

  // Scroll smoothly to form
  formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Optional: Add a flash highlight
  formRef.current?.classList.add("ring", "ring-blue-400");



  // Remove highlight after a short delay
  setTimeout(() => {
    formRef.current?.classList.remove("ring", "ring-blue-400");
  }, 1200);
};*/


const handleEdit = (template: Template) => {
  console.log("Editing template:", template);
  setEditingId(template.id);
  setEditForm({
    name: template.name || '',
    address: template.address || '',
    prefecture: template.prefecture || '',
    holes: template.holes?.length
      ? template.holes.map(h => ({
          par: Number(h.par) || 0,
          holeNumber: h.holeNumber ?? ''
        }))
      : Array.from({ length: 18 }, (_, i) => ({
          par: 0,
          holeNumber: i + 1
        })),
  });
};

const handleEditChange = (e:any) => {
  const { name, value } = e.target;
  setEditForm((prev) => ({ ...prev, [name]: value }));
};

const handleHoleChange = (index:number, value:number) => {
  const newHoles = [...editForm.holes];
  newHoles[index] = { par: Number(value), holeNumber: index + 1 };
  setEditForm((prev) => ({ ...prev, holes: newHoles }));
};

const handleEditSave = async () => {
  try {
    const res = await axios.put(
      `${API_ENDPOINTS.UPDATETEMPLATE}/${editingId}`,
      editForm,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data) {
      // Merge updated form into existing table
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? { ...t, ...editForm } // overwrite only the edited fields
            : t
        )
      );

      toast.success("Template updated!");
      setEditingId(null);
    } else {
      toast.error("Failed to update template.");
    }
  } catch (error) {
    console.error("Error updating template:", error);
    toast.error("Failed to update template.");
  }
};
const handleCancel = () => {
  setEditingId(null);
};

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await axios.delete(`${API_ENDPOINTS.DELETETEMPLATE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTemplates();
  };

    const [uploading, setUploading] = useState(false);


  const handleTemplatesFileUpload = async (file:any) => {
    const token = localStorage.getItem("admin_token");
    const formData = new FormData();
    formData.append("file", file);

    console.log("Uploading file:", file);
    console.log("Token:", token);
    try {
      setUploading(true);
      const response = await axios.post(`${API_ENDPOINTS.UPLOADTEMPLATE}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
      toast.success("File uploaded successfully!");
      fetchTemplates(); // Refresh templates after upload
    } catch (error) {
      console.error("Error uploading templates:", error);
     toast.error("Failed to upload templates. Please try again.");
    } finally {
      setUploading(false);
    }
  }; 

/*  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results:any) => {
      const parsed = results.data as any[];

      const validTemplates = parsed.map((row, i) => {
        const name = row.name?.trim();
        const address = row.address?.trim();

        const holes = Array.from({ length: 18 }, (_, index) => {
          const par = parseInt(row[`hole${index + 1}`]);
          return {
            holeNumber: index + 1,
            par: isNaN(par) ? 4 : par, // default to 4
          };
        });

        if (!name || !address) {
          console.warn(`Row ${i + 1} missing name or address`);
          return null;
        }

        return { name, address, holes };
      }).filter(Boolean); // remove invalid ones

      setParsedTemplates(validTemplates);
    }
  });
};*/

  return (
      <DefaultLayout>
      <Breadcrumb pageName="Course Settings" />
    <div  className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h2 className="text-xl font-bold mb-4">Course Template</h2>

        <div className="flex gap-2 items-center">
          <label className="text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-md cursor-pointer">
              Upload CSV
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleTemplatesFileUpload(e.target.files[0])}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

<div ref={formRef} className='p-5 bg-gray-100 rounded-md shadow-sm mb-6'>
       <div className="mb-10 mt-1">
       {/*} {editingId ? (
  <div className="text-blue-600 font-semibold mb-2">
    Now editing: {templates.find(t => t.id === editingId)?.name}
  </div>
):( <div className="text-blue-600 font-semibold mb-2">
    Create Template
  </div>)}*/}
  <div className="text-blue-600 font-semibold mb-2">
    Create Template
  </div>
        <div className=" mt-5 mb-5">
        <label className="mr-5">Template Name:</label>
        <input
          type="text"
          placeholder="Template Name"
          value={template.name}
          onChange={(e) => setTemplate({ ...template, name: e.target.value })}
          className="border px-2 py-1 rounded mr-2"
        />
        </div>
        <div className=" mb-5">
        <label className="mr-5">Address:</label>
        <input
          type="text"
          placeholder="Address"
          value={template.address}
          onChange={(e) => setTemplate({ ...template, address: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        </div>
           <div className=" mb-5">
        <label className="mr-5">Prefecture:</label>
        <select
    value={template.prefecture}
    onChange={(e) => setTemplate({ ...template, prefecture: e.target.value })}
    className="border px-2 py-1 rounded"
  >
    <option value="">Select a prefecture</option>
    {prefectures.map((pref) => (
      <option key={pref} value={pref}>
        {pref}
      </option>
    ))}
  </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-3 gap-4">
        {template.holes.map((hole, index) => (
          <div key={hole.holeNumber} className="flex items-center gap-2">
            <label>Hole {hole.holeNumber}</label>
            <input
              type="number"
              value={hole.par}
              onChange={(e) => handleParChange(index, parseInt(e.target.value))}
              className="border px-2 py-1 rounded w-16"
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600 transition-colors duration-200"
        >
          {/* editingId ? 'Save Changes' : 'Create Template' */}
          Create Template
        </button>
        {/* editingId && (
    <button
      className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
      onClick={() => {
        setEditingId(null);
        setTemplate({ name: '', address: '',prefecture:'', holes: initialHoles });
      }}
    >
      Cancel
    </button>
  )*/} 


      </div>
</div>

      <div className="mt-6">
        {templates.length === 0 && (
          <p className="text-gray-500">No templates saved yet.</p>
        )}
        {templates.length > 0 && (
        <div className="border-t mt-4 pt-4">    

        <h3 className="text-lg font-semibold mb-2">Saved Course Settings</h3>
              <div className="overflow-x-auto rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-md">
                <table className="w-full table-auto">
                  <thead>
<tr className="bg-gray-2 text-left dark:bg-meta-4">
  <th  className="py-5 px-4 text-left"><span className="font-semibold">Template Name</span></th>
  <th  className="py-5 px-4 text-left"><span className="font-semibold">Address</span></th>
  <th  className="py-5 px-4 text-left"><span className="font-semibold">Prefecture</span></th>
  {/* Add hole columns */}
      {Array.from({ length: 18 }, (_, i) => (
        <th key={`hole${i + 1}`} className="py-5 px-2 text-left">
          <span className="font-semibold">{`Hole ${i + 1}`}</span>
        </th>
      ))}
  <th  className="py-5 px-4 text-left"><span className="font-semibold">Actions</span></th>
</tr>

                  </thead>
                  <tbody>
                        {templates.map((t) => (
                    <tr key={t.id} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                         {editingId === t.id ? (
        <>
          <td className="py-5 px-4">
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              className="border px-2 py-1 rounded"
            />
          </td>
          <td className="py-5 px-4">
            <input
              type="text"
              name="address"
              value={editForm.address}
              onChange={handleEditChange}
              className="border px-2 py-1 rounded"
            />
          </td>
          <td className="py-5 px-4">
            <select
              name="prefecture"
              value={editForm.prefecture}
              onChange={handleEditChange}
              className="border px-2 py-1 rounded"
            >
              <option value="">Select</option>
              {prefectures.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </td>
          {Array.from({ length: 18 }, (_, i) => (
            <td key={`hole${i + 1}`} className="py-5 px-2">
              <input
                type="number"
                value={editForm.holes[i]?.par || ''}
                onChange={(e) => handleHoleChange(i, e.target.value)}
                className="border px-1 py-1 rounded w-16"
              />
            </td>
          ))}
          <td className="py-5 px-4 flex gap-2">
            <button onClick={handleEditSave} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
            <button onClick={handleCancel} className="bg-blue-400 text-white px-3 py-1 rounded">Cancel</button>
          </td>
        </>
      ) :( <>
                      <td className="py-5 px-4 text-left">{t.name}</td>
                      <td className="py-5 px-4 text-left">{t.address}</td>
                      <td className="py-5 px-4 text-left">{t.prefecture}</td>
                      {/* Render hole par values */}
        {Array.from({ length: 18 }, (_, i) => (
          <td key={`hole${i + 1}`} className="py-5 px-2 text-left">
            {t.holes?.[i]?.par ?? ''}
          </td>
        ))}
                      <td className="py-5 px-4 text-left">
                         <button onClick={() => handleEdit(t)} aria-label="Edit">
                            <FaPen style={{ color: "#5f6cb8" }} />
                          </button>
                         <button
                            onClick={() => handleDelete(t.id)}
                            className="text-red-500 hover:underline ml-2"
                            aria-label="Delete"
                          >
                            <FaTrash style={{ color: "#5f6cb8" }} />
                          </button>
                      </td> </>)}
                      </tr> 
                        ))}
                    </tbody>          
   
                </table>
              </div>
        
        </div>

                )}
        </div>

      </div>
    </DefaultLayout>
  );
};

export default CourseTemplatePage;
