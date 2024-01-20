import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useParams, } from "react-router-dom";

const Profile = () => {
  const [doctor, setDoctor] = useState(null);

  const params = useParams();


  //getDOc Details
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      {/* {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], "HH:mm"),
              moment(doctor.timings[1], "HH:mm"),
            ],
          }}
        >
          <h4 className="">Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="your website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your clinic address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Cunsaltation"
                name="feesPerCunsaltation"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timings" name="timings" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )} */}

      {doctor && <main className="profile-page">
        <section className="h-[500px] relative block">
          <div
            className="absolute top-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')" }}
          >

          </div>
          <div className="h-[70px] pointer-events-none absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden" >

          </div>
        </section>

        <section className="bg-slate-200 relative py-16">
          <div className="container mx-auto px-4">
            <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                    <div className="relative">
                      <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="max-w-[150px] absolute -m-16 -ml-20 h-auto rounded-full border-none align-middle shadow-xl lg:-ml-16" />
                    </div>
                  </div>
                  <div className="w-full px-4 lg:order-3 lg:w-4/12 lg:self-center text-center sm:text-start  lg:text-right">
                    <div className="mt-32 px-3 py-6 sm:mt-0 ">
                      <button className="mb-1 rounded bg-pink-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600 sm:mr-2 " type="button">Connect</button>
                    </div>
                  </div>
                  <div className="w-full px-4 lg:order-1 lg:w-4/12">
                    <div className="flex justify-center py-4 pt-8 lg:pt-4">
                      <div className="mr-4 p-3 text-center"><span className="text-slate-600 block text-xl font-bold uppercase tracking-wide">22</span><span className="text-slate-400 text-sm">Friends</span></div>
                      <div className="mr-4 p-3 text-center"><span className="text-slate-600 block text-xl font-bold uppercase tracking-wide">10</span><span className="text-slate-400 text-sm">Photos</span></div>
                      <div className="p-3 text-center lg:mr-4"><span className="text-slate-600 block text-xl font-bold uppercase tracking-wide">89</span><span className="text-slate-400 text-sm">Comments</span></div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 text-center">

                  <h3 className="text-slate-700 mb-2  text-4xl font-semibold leading-normal">
                    {doctor.firstName} {doctor.lastName}</h3>
                    <div className="text-slate-400 mb-2 mt-0 text-sm font-bold uppercase leading-normal">
                    <i className="fa-solid fa-stethoscope text-slate-400 mr-2 text-lg"></i>
                    {doctor.specialization}
                  </div>
                  <div className="text-slate-400 mb-2 mt-0 text-sm font-bold uppercase leading-normal">
                    <i className="fas fa-map-marker-alt text-slate-400 mr-2 text-lg"></i>
                    {doctor.address}
                  </div>
                  

                  <div className="text-slate-600 mb-2 mt-10"><i className="fas fa-briefcase text-slate-400 mr-2 text-lg"></i>Solution Manager - Creative Tim Officer</div>
                  <div className="text-slate-600 mb-2"><i className="fas fa-university text-slate-400 mr-2 text-lg"></i>University of Computer Science</div>
                </div>
                <div className="border-slate-200 mt-10 border-t py-10 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4 lg:w-9/12">
                      <p className="text-slate-700 mb-4 text-lg leading-relaxed">An artist of considerable range, Jenna the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>}

    </Layout>
  );
};

export default Profile;
